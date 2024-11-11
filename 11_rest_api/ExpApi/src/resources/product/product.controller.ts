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
   /*
   #swagger.summary = 'Adiciona um Produto na base.'
   #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateProductDTO'}
   }
   #swagger.responses[201] = {
      schema: {$ref: '#/definitions/Product'
      }
   }
   #swagger.responses[409] = {
      in: 'body',
      text: 'CONFLICT'
   }
   #swagger.responses[403] = {
      in: 'body',
      text: 'FORBIDDEN'
   }
   #swagger.responses[422] = {
      in: 'body',
      text: 'UNPROCESSABLE ENTITY'
   }
   
   
   */ 
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
   /*
   #swagger.summary = 'Recupera Dados sobre um Produto Específico.'
   #swagger.parameters['id'] = {description: 'ID do produto'}
   #swagger.responses[200] = {
      schema: {$ref: '#/definitions/Product'}
   }
   #swagger.responses[404] = {
      in: 'body',
      text: 'NOT FOUND'
   }
   */ 
   
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
   /*
   #swagger.summary = 'Atualiza um Produto registrado.'
   #swagger.parameters['id'] = {description: 'Id do Produto.'}
   #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateProductDTO'}
   }
   #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Product'}
   }
   #swagger.responses[404] = {
      in: 'body',
      text: 'NOT FOUND'
   }
   #swagger.responses[403] = {
      in: 'body',
      text: 'FORBIDDEN'
   }
   */
   
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
/*
   #swagger.summary = 'Lista de Produtos.'
   #swagger.responses[200] = {
     description: 'Lista de produtos',
         schema: {
           $ref: '#/definitions/Products'}
         }
       

 */
   
   try{
      const products: Product[] = await getAllProducts();
      response.status(StatusCodes.OK).json(products);
   }catch(err){
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
   }

};

const remove = async (request: Request, response: Response) => {
   /**
   #swagger.summary = 'Deleta um Produto da base.'
   #swagger.parameters['id'] = { description: 'Id do Produto.' }
   #swagger.responses[204] = {
       schema: {  }
   }
   #swagger.responses[400] = {
      in: 'body',
      text: 'BAD REQUEST'
   }
   #swagger.responses[403] = {
      in: 'body',
      text: 'FORBIDDEN'
   }
 */
   const {id} = request.params;
   try {
      const [rowsAffected, err] = await removeProduct(id);
      if(rowsAffected == 0){
         response.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
         return;
      }
       response.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
   } catch (error) {
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
};

export default {create, read, update, index, remove};