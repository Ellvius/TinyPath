import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createUrlTable } from './models/urlModel.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', urlRoutes);

createUrlTable();

export default app;
