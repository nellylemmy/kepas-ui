import Testimonial from '../models/Testimonial.js';

/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: Retrieve a list of testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: A list of testimonials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Testimonial'
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new testimonial
 *     tags: [Testimonials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimonialInput'
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.status(200).json(testimonials);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createTestimonial = async (req, res) => {
  const { author, quote, title, company } = req.body;
  if (!author || !quote) {
    return res.status(400).json({ message: 'Author and quote are required.' });
  }
  try {
    const newTestimonial = await Testimonial.create({ author, quote, title, company });
    res.status(201).json(newTestimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @swagger
 * /api/testimonials/{id}:
 *   get:
 *     summary: Retrieve a single testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Testimonial ID
 *     responses:
 *       200:
 *         description: A single testimonial
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       404:
 *         description: Testimonial not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Testimonial ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimonialInput'
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Testimonial not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Testimonial ID
 *     responses:
 *       200:
 *         description: Testimonial deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       404:
 *         description: Testimonial not found
 *       500:
 *         description: Server error
 */
export const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found.' });
    }
    res.status(200).json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const { author, quote, title, company } = req.body;
  if (!author || !quote) {
    return res.status(400).json({ message: 'Author and quote are required.' });
  }
  try {
    const updatedTestimonial = await Testimonial.update(id, { author, quote, title, company });
    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found.' });
    }
    res.status(200).json(updatedTestimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.delete(id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found.' });
    }
    res.status(200).json({ message: 'Testimonial deleted successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete testimonial.' });
  }
};