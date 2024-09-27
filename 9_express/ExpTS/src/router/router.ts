import {Router} from "express"
import { ProdutoController } from "../controllers/produtos.controller";
const router = Router();
const produtoController = new ProdutoController()

// rotas de produto
router.get("/produtos", produtoController.index);
router.all("/produto/create", produtoController.create);
router.put("/produto/:id", produtoController.update);
router.delete("/produto/delete/:id", produtoController.remove);

export {router};