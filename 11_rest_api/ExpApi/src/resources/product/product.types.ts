import { Decimal } from "@prisma/client/runtime/library";
interface ProductDTO {
    id: string;
    name: string;
    price: number;
    stockQuantity:number
}

type CreateProductDTO = Pick<ProductDTO, "name" | "price" | "stockQuantity">
export {ProductDTO, CreateProductDTO}