import express from 'express';
import prisma from '../utils/prisma.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch(e) { res.json([]); }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, category, service, image, url } = req.body || {};
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        category,
        service,
        image: image || '/images/default-customer.png',
        url: url || null,
      },
    });
    res.json(newCustomer);
  } catch(e) {
    console.error('Create customer error:', e);
    res.status(400).json({ error: 'Failed to create customer' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, service, image, url } = req.body || {};
    const data = { name, category, service };
    if (image !== undefined) data.image = image || '/images/default-customer.png';
    if (url !== undefined) data.url = url;

    const updated = await prisma.customer.update({
      where: { id: Number(id) },
      data,
    });
    res.json(updated);
  } catch(e) {
    console.error('Update customer error:', e);
    res.status(400).json({ error: 'Failed to update customer' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.customer.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch(e) { res.status(400).json({ error: 'Failed to delete customer' }); }
});

export default router;
