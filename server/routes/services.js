import express from 'express';
import prisma from '../utils/prisma.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services.map(s => ({...s, features: JSON.parse(s.features)})));
  } catch (e) {
    res.json([]);
  }
});

// Create
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, shortDescription, description, features, pricing, icon } = req.body;
    const newService = await prisma.service.create({
      data: { title, shortDescription, description, features: JSON.stringify(features || []), pricing, icon }
    });
    res.json(newService);
  } catch (e) {
    res.status(400).json({ error: 'Error creating service' });
  }
});

// Update
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.features) data.features = JSON.stringify(data.features);
    
    const updated = await prisma.service.update({
      where: { id: Number(id) },
      data
    });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: 'Error updating service' });
  }
});

// Delete
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.service.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: 'Error deleting service' });
  }
});

export default router;
