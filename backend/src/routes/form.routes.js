import { Router } from 'express';
import {
    createForm,
    getFormBySlug,
    submitForm,
    getResponses,
} from '../controllers/form.controller.js';

const router = Router();

// Admin
router.post('/', createForm);
router.get('/:id/responses', getResponses);

// Public
router.get('/slug/:slug', getFormBySlug);
router.post('/slug/:slug/submit', submitForm);

export default router;
