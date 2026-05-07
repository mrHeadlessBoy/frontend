import { Router } from 'express';
import { getArticles, createArticle, deleteArticle, updateArticle } from '../controllers/article.controller';

const router = Router();

// Full path: GET /v1/api/articles
router.get('/articles', getArticles);

// Full path: POST /v1/api/articles
router.post('/articles', createArticle);

router.delete('/articles/:id', deleteArticle);

router.patch('/articles/:id', updateArticle);

export default router;