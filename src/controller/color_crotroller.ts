import mongoose from "mongoose";
import { Request, Response } from "express";
import ColorModel from "../model/color_model"; 

export async function adicionarNovaCor(request: Request, response: Response) {
    try {
        const { name, hex}: {name: String, hex: String} = request.body;
        const newColor = await ColorModel.create({
            name,
            hex,
        });
        
        return response.status(201).json({
            status: 'success',
            data: newColor,
        });
    } catch (error) {
        if (error instanceof Error) {
            return response.status(400).json({ error: error.message });
        } else {
            return response.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
}

export async function listarCores(request: Request, response: Response) {
    try {
        const queryObject = {...request.query};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el) => delete queryObject[el]);

        let cores = ColorModel.find(queryObject).sort({isFavorite: -1});
        if(request.query.sort){
            cores = cores.sort(request.query.sort as string);
        }
        const page = request.query.page ? parseInt(request.query.page as string) : 1;
        const limit = request.query.limit ? parseInt(request.query.limit as string) : 1;
        const skip = (page - 1) * limit;

        if(request.query.limit || request.query.page){
            cores = cores.skip(skip).limit(parseInt(request.query.limit as string));
        }

        const queryCores = await cores;
        return response.status(200).json({
            status: 'success',
            data: queryCores,
        });
    } catch (error) {
        if (error instanceof Error) {
            return response.status(400).json({ error: error.message });
        } else {
            return response.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
}

export async function listarCorPorId(request: Request, response: Response) {
    try {
        const { id } = request.params;
        const cor = await ColorModel.findById(id);
        return response.status(200).json(cor);
    } catch (error) {
        if (error instanceof Error) {
            return response.status(400).json({ error: error.message });
        } else {
            return response.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
}

export async function deletarCor(request: Request, response: Response) {
    try{
        const {id} = request.params;
        await ColorModel.findByIdAndDelete(id);
        return response.status(204).send();
    }
    catch(error){
        if (error instanceof Error) {
            return response.status(400).json({ error: error.message });
        } else {
            return response.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
}

export async function atualizarFavorito(Request: Request, Response: Response){
    try{
        const {id} = Request.params;
        const cor = await ColorModel.findById(id);
        if(cor){
            cor.isFavorite = !cor.isFavorite;
            cor.updatedAt = new Date();
            await cor.save();
            return Response.status(200).json(cor);
        }
        return Response.status(404).json({error: "Cor não encontrada"});
    }
    catch(error){
        if (error instanceof Error) {
            return Response.status(400).json({ error: error.message });
        } else {
            return Response.status(400).json({ error: 'An unknown error occurred.' });
        }
    }
}
