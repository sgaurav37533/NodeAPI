
import { Router } from 'express';
import { Post } from '../database/models';

const router = Router();

// Create blog post
router.post('/posts', async (req, res) => {
    try {

        const { title, body } = req.body;

        const post = await Post.create({
            title,
            body
        });

        return res.status(201).json({ post });
    } catch (error) {
        console.log("internal error",error)
        res.status(500).json({ message: error.message });
    }
});


// Get all posts
router.get('/posts', async (req, res) => { try {
        const posts = await Post.findAll();
        return res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get post by id
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id }
        });

        if (!post) {
            return res.status(404).json({ message: 'the post with the given id was not found' });
        }

        return res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update post
router.patch('/posts/:id', async (req, res) => {
    try {
        const { title, body } = req.body;
        const posts = await Post.update(
            { title, body },
            {
                returning: true,
                where: { id: req.params.id }
            }
        );

        if (posts[0] === 0)
            return res.status(404).json({ message: 'The post with the given id was not found' });

        const post = posts[1][0].dataValues;

        return res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete post
router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.destroy({ where: { id: req.params.id } });
        if (!post)
            return res.status(404).json({ message: 'The post with the given id was not found' });

        return res.status(200).json({ message: 'The post was deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;