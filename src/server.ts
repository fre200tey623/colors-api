import express from 'express';
import dotenv from 'dotenv';
import { adicionarNovaCor,listarCores,listarCorPorId,deletarCor, atualizarFavorito } from './controller/color_crotroller';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL as string);

app.use(cors());
app.use(express.json());

app.get('/', listarCores);
app.get('/color/:id', listarCorPorId);
app.post('/color', adicionarNovaCor);
app.delete('/color/:id', deletarCor);
app.patch('/color/:id', atualizarFavorito);

const port = 3333;


app.listen(port, ()=> console.log(`O server esta rodando na porta: ${port}`));