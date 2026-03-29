import express from 'express';
import prisma from '../utils/prisma.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch(e) { res.json([]); }
});

router.post('/', requireAuth, upload.single('imageFile'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = '/uploads/' + req.file.filename;
    }
    const newCustomer = await prisma.customer.create({ data });
    res.json(newCustomer);
  } catch(e) { res.status(400).json({ error: 'Failed' }); }
});

router.put('/:id', requireAuth, upload.single('imageFile'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = '/uploads/' + req.file.filename;
      
      const oldCustomer = await prisma.customer.findUnique({ where: { id: Number(req.params.id) } });
      if (oldCustomer && oldCustomer.image && oldCustomer.image.startsWith('/uploads/')) {
        const filename = path.basename(oldCustomer.image);
        const oldImagePath = path.join(process.cwd(), 'uploads', filename);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }
    
    const updated = await prisma.customer.update({
      where: { id: Number(req.params.id) },
      data
    });
    res.json(updated);
  } catch(e) { 
    console.error(e);
    res.status(400).json({ error: 'Failed' }); 
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({ where: { id: Number(req.params.id) } });
    if (customer && customer.image && customer.image.startsWith('/uploads/')) {
      const filename = path.basename(customer.image);
      const imagePath = path.join(process.cwd(), 'uploads', filename);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await prisma.customer.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch(e) { res.status(400).json({ error: 'Failed' }); }
});

export default router;
