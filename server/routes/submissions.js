import express from 'express';
import prisma from '../utils/prisma.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin can view all
router.get('/', requireAuth, async (req, res) => {
  try {
    const subs = await prisma.formSubmission.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(subs);
  } catch(e) { res.json([]); }
});

// Public can submit
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, message, serviceName, budget } = req.body;
    
    // Inject budget safely into message since schema doesn't have it natively
    const finalMessage = budget ? `[Budget: ${budget}]\n\n${message}` : message;

    const sub = await prisma.formSubmission.create({ 
      data: {
        name,
        email,
        phone,
        domain: company || '',
        serviceName: serviceName || 'General Inquiry',
        message: finalMessage
      }
    });
    res.json({ success: true, submission: sub });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(400).json({ error: 'Failed to submit form' });
  }
});

// Update status
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await prisma.formSubmission.update({
      where: { id: Number(req.params.id) },
      data: { status: req.body.status }
    });
    res.json(updated);
  } catch(e) { res.status(400).json({ error: 'Failed to update' }); }
});

// Delete
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.formSubmission.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch(e) { res.status(400).json({ error: 'Failed to delete' }); }
});

export default router;
