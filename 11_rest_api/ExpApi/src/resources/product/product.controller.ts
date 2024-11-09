import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { CreateProductDTO } from "./product.types";
import { 
   alreadyExists, 
   createProduct, 
   getAllProducts, 
   readProductById, 
   removeProduct, 
   updateProduct 
} from "./product.service";
import {StatusCodes, ReasonPhrases} from "http-status-codes";

const create = async (request: Request, response: Response) => {
    try{
      const product: CreateProductDTO = request.body;
      if (await alreadyExists(product.name)){
         response.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
      }
      const newProduct = await createProduct(product);
      response.status(StatusCodes.CREATED).json(newProduct);
    }
    catch(err){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
};

const read = async (request: Request, response: Response) => {

    const {id} = request.params;
    try{
      const product = await readProductById(id);

      if(!product){
         response.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
         return;
      } 
      response.status(StatusCodes.OK).json(product);

    }catch(err){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
};

const update = async (request: Request, response: Response) => {
   const {id} = request.params;
   const product = request.body as CreateProductDTO;
   try{
      const searchProduct = await readProductById(id);
      if(!searchProduct){
         response.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);  
         return;       
      }
      const [updatedProduct,  affectedCount] = await updateProduct(id, product);
      response.status(StatusCodes.OK).json(updatedProduct);
   }catch(err){
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
   }
};

const index = async (request: Request, response: Response) => {
   try{
      const products: Product[] = await getAllProducts();
      response.status(StatusCodes.OK).json(products);
   }catch(err){
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
   }

};

const remove = async (request: Request, response: Response) => {
   const {id} = request.params;
   try {
      const [rowsAffected, err] = await removeProduct(id);
      if(rowsAffected == 0){
         response.status(StatusCodes.NOT_IMPLEMENTED).send(err);
         return;
      }
       response.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
   } catch (error) {
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
};

export default {create, read, update, index, remove};