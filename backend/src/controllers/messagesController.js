import pool from '../config/database.js';
import transporter from '../config/email.js';
import Lead from '../models/Lead.js';
import redis from 'redis';

const redisClient = redis.createClient({ url: 'redis://redis:6379' });
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();

export const createMessage = async (req, res) => {
  const { name, email, phone, message, identifier } = req.body;
  console.log('Received message data:', { name, email, phone, message, identifier });

  if (!name || !email || !phone || !message || !identifier) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await redisClient.bf.add('user-submissions', identifier);
    const newMessage = await pool.query(
      'INSERT INTO messages (name, email, phone, message, identifier) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, message, identifier]
    );

    // Insert into leads table using the Lead model
    await Lead.create({ name, email, phone, message, source: 'contact_form' });

    // Send email notification
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Contact Form Submission',
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Message: ${message}</p>`,
      });
      console.log('Email sent successfully!');
    } catch (emailError) {
      console.error('Error sending email:', emailError.message);
    }

    res.status(201).json(newMessage.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to send message.' });
  }
};

export const getMessagesByIdentifier = async (req, res) => {
    const { identifier } = req.params;
    console.log(`Fetching messages for identifier: ${identifier}`);
    try {
        const exists = await redisClient.bf.exists('user-submissions', identifier);
        if (exists) {
            const messages = await pool.query('SELECT * FROM messages WHERE identifier = $1', [identifier]);
            res.json(messages.rows);
        } else {
            res.json([]);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch messages.' });
    }
};
