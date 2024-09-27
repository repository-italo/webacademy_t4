import {Request, Response} from "express"
import axios from "axios";

import {CreateProdutoDTO, Produto} from "../types/Produto"

class ProdutoController {

    public index = async  (request: Request, response: Response) => {
        const { data: produtos } = await axios.get<Produto []>(`${process.env.DB_SERVER}/produtos`);

        try{
            return response.render('produto/index', {produtos});

        }catch(err){
            return response.status(500).json(err)
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

    }

    public remove = async (request: Request, response: Response) => {

    }
}

export {ProdutoController}