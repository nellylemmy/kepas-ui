import express from 'express';
const router = express.Router();
import * as testimonialsController from '../controllers/testimonialsController.js';

router.get('/testimonials', testimonialsController.getAllTestimonials);
// router.get('/testimonials/cards', testimonialsController.getTestimonialCards);
router.post('/testimonials', testimonialsController.createTestimonial);
router.get('/testimonials/:id', testimonialsController.getTestimonialById);
router.put('/testimonials/:id', testimonialsController.updateTestimonial);
router.delete('/testimonials/:id', testimonialsController.deleteTestimonial);

export default router;
