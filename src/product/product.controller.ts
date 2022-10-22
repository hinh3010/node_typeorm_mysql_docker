import { Request, Response } from "express";
import { UpdateResult } from "typeorm";
import { HttpResponse } from "../shared/response/http.response";
import { ProductService } from "./product.service";

export class ProductController {

    constructor(
        private readonly productService: ProductService = new ProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getProducts(req: Request, res: Response) {
        try {
            const data = await this.productService.findAllProducts();
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async getProductById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.productService.findProductById(id);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async createProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.createProduct(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.productService.findProductById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "Product not found");
            }
            const isUpdated: UpdateResult = await this.productService.updateProduct(id, req.body);
            if (!isUpdated.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            const data = await this.productService.findProductById(id)
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.productService.findProductById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "Product not found");
            }
            const isDeleted = await this.productService.deleteProduct(id);
            if (!isDeleted.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            return this.httpResponse.Ok(res, isExist)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

}
