import Lead from '../models/Lead.js';
import pool from '../config/database.js';

/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Retrieve a list of leads
 *     tags: [Leads]
 *     responses:
 *       200:
 *         description: A list of leads
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: |-
 *                 <table>
 *                   <thead>
 *                     <tr>
 *                       <th>ID</th>
 *                       <th>Name</th>
 *                       <th>Email</th>
 *                       <th>Phone</th>
 *                       <th>Message</th>
 *                       <th>Source</th>
 *                       <th>Created At</th>
 *                     </tr>
 *                   </thead>
 *                   <tbody>
 *                     <tr>
 *                       <td>1</td>
 *                       <td>John Doe</td>
 *                       <td>john@example.com</td>
 *                       <td>+1234567890</td>
 *                       <td>Hello</td>
 *                       <td>contact_form</td>
 *                       <td>2023-01-01T12:00:00Z</td>
 *                     </tr>
 *                   </tbody>
 *                 </table>
 *       500:
 *         description: Server error
 */
export const getAllLeads = async (req, res) => {
  try {
    const { search } = req.query;
    let query = 'SELECT * FROM leads';
    const params = [];

    if (search) {
      query += ' WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1 OR message ILIKE $1';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const allLeads = await pool.query(query, params);
    res.status(200).json(allLeads.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @swagger
 * /api/leads/{id}:
 *   delete:
 *     summary: Delete a lead by ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lead ID
 *     responses:
 *       200:
 *         description: Lead deleted successfully
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLead = await Lead.delete(id);
    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found.' });
    }
    res.status(200).json({ message: 'Lead deleted successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete lead.' });
  }
};