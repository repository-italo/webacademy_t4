import {prismaClient} from "../../utils/prismaClient";
import { Product } from "@prisma/client";
import { CreateProductDTO } from "./product.types";

export async function getAllProducts(): Promise<Product[]>{
   return await prismaClient.product.findMany();
}

export async function createProduct(product: CreateProductDTO): Promise<Product>{
   return await prismaClient.product.create({data: product})
}

export async function updateProduct (id: string,product: CreateProductDTO): Promise<[product: Product | null, affectedCount: number]> {
      const updatedProduct = await prismaClient.product.update({
         where: {id},
         data: product,
      })
      return [updatedProduct, 1];
}

export async function readProductById (id: string): Promise<Product | null> {
   return await prismaClient.product.findUnique({where: {id}, })
}

export async function alreadyExists(name: string): Promise<boolean> {
   return !!( await prismaClient.product.findFirst({where:{name} }))
}

export async function removeProduct (id: string): Promise<[number, err: any]>{
   try{
      await prismaClient.product.delete({where: {id}});
      return [1, null];
   }catch(err){
      throw err;
   }
}