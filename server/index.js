import cors from 'cors';
import express from 'express';
import { prisma } from './db.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

app.use(
  cors({
    origin: corsOrigin,
  }),
);
app.use(express.json());

app.get('/api/health', async (_request, response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    response.json({ ok: true });
  } catch (error) {
    response.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Database unavailable.',
    });
  }
});

app.post('/api/auth/signin', async (request, response) => {
  const { email, fullName, phone } = request.body ?? {};

  if (!email || !fullName || !phone) {
    response.status(400).json({ error: 'Email, full name, and phone are required.' });
    return;
  }

  const user = await prisma.user.upsert({
    where: { email: String(email).trim().toLowerCase() },
    update: {
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
    },
    create: {
      email: String(email).trim().toLowerCase(),
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
    },
  });

  response.json({
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
  });
});

app.get('/api/orders', async (request, response) => {
  const email = String(request.query.email ?? '').trim().toLowerCase();

  if (!email) {
    response.status(400).json({ error: 'Email is required.' });
    return;
  }

  const orders = await prisma.order.findMany({
    where: { customerEmail: email },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  response.json(
    orders.map((order) => ({
      id: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      deliveryAddress: order.deliveryAddress,
      deliveryInstructions: order.deliveryInstructions ?? '',
      confirmationChannels: order.confirmationChannels,
      paymentGateway: order.paymentGateway,
      paymentStatus: order.paymentStatus,
      paymentReference: order.paymentReference,
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      total: order.total,
      createdAt: order.createdAt.toISOString(),
      items: order.items.map((item) => ({
        id: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        description: item.description ?? '',
      })),
    })),
  );
});

app.post('/api/orders', async (request, response) => {
  const payload = request.body ?? {};

  if (!payload.id || !payload.customerEmail || !Array.isArray(payload.items) || payload.items.length === 0) {
    response.status(400).json({ error: 'Order id, customer email, and items are required.' });
    return;
  }

  const customerEmail = String(payload.customerEmail).trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: customerEmail },
  });

  const order = await prisma.order.create({
    data: {
      id: String(payload.id),
      customerName: String(payload.customerName),
      customerEmail,
      customerPhone: String(payload.customerPhone),
      deliveryAddress: String(payload.deliveryAddress),
      deliveryInstructions: payload.deliveryInstructions ? String(payload.deliveryInstructions) : null,
      confirmationChannels: payload.confirmationChannels,
      paymentGateway: payload.paymentGateway,
      paymentStatus: payload.paymentStatus,
      paymentReference: String(payload.paymentReference),
      subtotal: Number(payload.subtotal),
      deliveryFee: Number(payload.deliveryFee),
      total: Number(payload.total),
      createdAt: new Date(String(payload.createdAt)),
      userId: user?.id,
      items: {
        create: payload.items.map((item) => ({
          menuItemId: String(item.id),
          name: String(item.name),
          quantity: Number(item.quantity),
          price: Number(item.price),
          description: item.description ? String(item.description) : null,
        })),
      },
    },
    include: { items: true },
  });

  response.status(201).json({
    id: order.id,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    customerPhone: order.customerPhone,
    deliveryAddress: order.deliveryAddress,
    deliveryInstructions: order.deliveryInstructions ?? '',
    confirmationChannels: order.confirmationChannels,
    paymentGateway: order.paymentGateway,
    paymentStatus: order.paymentStatus,
    paymentReference: order.paymentReference,
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    total: order.total,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      id: item.menuItemId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      description: item.description ?? '',
    })),
  });
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
