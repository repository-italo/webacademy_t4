import { Request, Response } from "express";
import { Product } from "@prisma/client";
const create = async (request: Request, response: Response) => {
    try{
        const {name, price, stock_quantity} = request.body;

        response.status(201).json({message: "ok"});
    }
    catch(err){
        response.status(500).send(err);
    }
};
const read = async (request: Request, response: Response) => {
    const {id} = request.params;
    try{

        response.status(200);

    }catch(err){
        response.status(500).send(err);
    }
};
const update = (request: Request, response: Response) => {};
const index = (request: Request, response: Response) => {

    response.status(200).json();
};

const remove = (request: Request, response: Response) => {};

export default {create, read, update, index, remove};