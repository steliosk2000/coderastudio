import express from 'express';
import prisma from '../utils/prisma.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'coderastudio/customers',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
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
      data.image = req.file.path; // Cloudinary URL
    }
    const newCustomer = await prisma.customer.create({ data });
    res.json(newCustomer);
  } catch(e) { res.status(400).json({ error: 'Failed' }); }
});

router.put('/:id', requireAuth, upload.single('imageFile'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.path; // Cloudinary URL

      // Delete old Cloudinary image
      const oldCustomer = await prisma.customer.findUnique({ where: { id: Number(req.params.id) } });
      if (oldCustomer?.image && oldCustomer.image.includes('cloudinary')) {
        const publicId = req.file.filename.split('.')[0];
        await cloudinary.uploader.destroy(`coderastudio/customers/${publicId}`).catch(() => {});
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
    if (customer?.image && customer.image.includes('cloudinary')) {
      // Extract public_id from Cloudinary URL and delete
      const parts = customer.image.split('/');
      const fileWithExt = parts[parts.length - 1];
      const publicId = `coderastudio/customers/${fileWithExt.split('.')[0]}`;
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }
    await prisma.customer.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch(e) { res.status(400).json({ error: 'Failed' }); }
});

export default router;
