import express from 'express';
const router = express.Router();
import * as postsController from '../controllers/postsController.js';

router.get('/posts', postsController.getAllPosts);
router.get('/posts/cards', postsController.getPostCards);
router.post('/posts', postsController.createPost);
router.get('/posts/:id', postsController.getPostById);
router.put('/posts/:id', postsController.updatePost);
router.delete('/posts/:id', postsController.deletePost);

export default router;
