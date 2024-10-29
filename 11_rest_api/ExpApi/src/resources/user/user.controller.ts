import {Request, Response} from 'express'

const index = async (req: Request, res: Response) => {

}
const create = async (req: Request, res: Response) => {
   const {firstName, lastName, email, password} = req.body;

   
}
const read = async (req: Request, res: Response) => {}
const update = async (req: Request, res: Response) => {}
const remove = async (req: Request, res: Response) => {}

export default {index, create, read, update, remove};