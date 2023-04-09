import express from 'express'
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost, nominationForProject, selectedUser } from '../controllers/PostController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js'
const router = express.Router()

router.post('/',createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)
router.post('/:id/nominations',nominationForProject)
router.post('/:id/selecteduser',selectedUser)

export default router