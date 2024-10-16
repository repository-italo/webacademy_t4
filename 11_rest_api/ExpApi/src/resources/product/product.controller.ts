import { Request, Response } from "express";

const products: any = [];
const create = (request: Request, response: Response) => {
    try{
        const {name, price, id} = request.body;
        products.push({
            id: id,
            name: name,
            price: price,
        })

        response.status(201).json({message: "ok"});
    }
    catch(err){
        response.status(500).send(err);
    }
};
const read = (request: Request, response: Response) => {
    const {id} = request.params;
    try{
        const product: any = products.find((p: any) => p.id === id);

        if(!product){
            response.status(404).json({message:"not found"});
            return;
        }
        response.status(200).json(product);

    }catch(err){
        response.status(500).send(err);
    }
};
const update = (request: Request, response: Response) => {};
const index = (request: Request, response: Response) => {

    response.status(200).json(products);
};

const remove = (request: Request, response: Response) => {};

export default {create, read, update, index, remove};