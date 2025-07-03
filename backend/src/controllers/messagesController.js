import pool from '../config/database.js';
import transporter from '../config/email.js';
import Lead from '../models/Lead.js';

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Submit a new contact message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the sender
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the sender
 *               phone:
 *                 type: string
 *                 description: Phone number of the sender
 *               message:
 *                 type: string
 *                 description: Content of the message
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: <div class="toast success show">Message sent successfully!</div>
 *       400:
 *         description: All fields are required
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: <div class="toast error show">All fields are required.</div>
 *       429:
 *         description: Too many requests
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: <div class="toast error show">Too many requests. Please try again later.</div>
 *       500:
 *         description: Server error
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: <div class="toast error show">Failed to send message.</div>
 */
export const createMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('Received message data:', { name, email, phone, message });

  if (!name || !email || !phone || !message) {
    return res.status(400).send('<div class="toast error show">All fields are required.</div>');
  }

  try {
    const newMessage = await pool.query(
      'INSERT INTO messages (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, message]
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

    res.status(201).send('<div class="toast success show">Message sent successfully!</div>');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('<div class="toast error show">Failed to send message.</div>');
  }
};
