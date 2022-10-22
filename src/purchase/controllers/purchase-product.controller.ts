import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseProductService } from "../services/purchase-product.service";

export class PurchaseProductController {

    constructor(
        private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getPurchaseProducts(req: Request, res: Response) {
        try {
            const data = await this.purchaseProductService.findAllPurchaseProducts();
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async getPurchaseProductById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.purchaseProductService.findPurchaseProductById(
                id
            );
            if (data)
                return this.httpResponse.Ok(res, data)
            return this.httpResponse.NotFound(res, "Purchase Product not found")
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async createPurchaseProduct(req: Request, res: Response) {
        try {
            const data = await this.purchaseProductService.createPurchaseProduct(
                req.body
            );
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async updatePurchaseProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.purchaseProductService.findPurchaseProductById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "Purchase Product not found");
            }
            const isUpdated = await this.purchaseProductService.updatePurchaseProduct(id, req.body);
            if (!isUpdated.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            const data = await this.purchaseProductService.findPurchaseProductById(id)
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async deletePurchaseProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.purchaseProductService.findPurchaseProductById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "Purchase Product not found");
            }
            const isDeleted = await this.purchaseProductService.deletePurchaseProduct(id);
            if (!isDeleted.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            return this.httpResponse.Ok(res, isExist)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

}
