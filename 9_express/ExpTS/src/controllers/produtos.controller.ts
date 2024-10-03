import {Request, Response} from "express"
import axios from "axios";

import {CreateProdutoDTO, Produto} from "../types/Produto"

class ProdutoController {

    public index = async  (request: Request, response: Response) => {
        try{
         const { data: produtos } = await axios.get<Produto []>(`${process.env.DB_SERVER}/produtos`);
            return response.render('produto/index', {produtos});

        }catch(err){
            return response.status(500).json(err)
        }
    }
    public readProdutoById = async (request: Request, response: Response) => {
      try {
         const {id} = request.params;
         const {data: produto} = await axios.get<Produto>(`${process.env.DB_SERVER}/produtos/${id}`);
         response.render("produto/read", {produto});
      } catch (error) {
         return response.status(500).json(error);
      }
    }

    public create = async (request: Request, response: Response) => {
        try{
            if(request.method === "GET"){
                return response.render("produto/create");
            }else if(request.method === "POST"){
                const produto = request.body as CreateProdutoDTO;
                axios.post(`${process.env.DB_SERVER}/produtos`, produto);
                response.redirect("/produtos");
            }            
        }catch(err){
            return response.status(500).json(err);
        }

    }

    public update = async (request: Request, response: Response) => {
      try{
         const {id} = request.params;
         const {data:produto} = await axios.get<Produto>(`${process.env.DB_SERVER}/produtos/${id}`);
         if(request.method === "GET"){
            response.render("produto/update", {produto});
         }else if(request.method === "POST"){
            console.log(request.body);
            const updatedProduto = request.body as CreateProdutoDTO;
            console.log(updatedProduto);
         axios.put(`${process.env.DB_SERVER}/produtos/${id}`, updatedProduto); 
         response.redirect("/produtos");         
      }
      }catch(err){
         return response.status(500).json(err);
      }
    }

    public remove = async (request: Request, response: Response) => {
      try{
         const {id} = request.params;
         axios.delete(`${process.env.DB_SERVER}/produtos/${id}`);
         response.redirect("/produtos");

      }catch(err){
         return response.status(500).json(err);
      }
    }
}

export {ProdutoController}