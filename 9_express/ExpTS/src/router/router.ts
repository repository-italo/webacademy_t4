import {Router} from "express"
import { ProdutoController } from "../controllers/produtos.controller";
const router = Router();
import mainController from "../controllers/main.controller";

const produtoController = new ProdutoController()

// rotas de main
router.get("/lorem/:paragraphs", mainController.lorem);
router.get("/hb1", mainController.hb1)
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4);

// rotas de produto
router.get("/produtos", produtoController.index);
router.all("/produto/create", produtoController.create);
router.get("/produto/read/:id", produtoController.readProdutoById);
router.all("/produto/update/:id", produtoController.update);
router.get("/produto/delete/:id", produtoController.remove);

export {router};