import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseService } from "../services/purchase.service";

export class PurchaseController {

    constructor(
        private readonly purchaseService: PurchaseService = new PurchaseService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getPurchases(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.findAllPurchases();
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async getPurchaseById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.purchaseService.findPurchaseById(id);
            if (data)
                return this.httpResponse.Ok(res, data)
            return this.httpResponse.NotFound(res, "Purchase not found")
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async createPurchase(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.createPurchase(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async updatePurchase(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.purchaseService.findPurchaseById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "Purchase not found");
            }
            const isUpdated = await this.purchaseService.updatePurchase(id, req.body);
            if (!isUpdated.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            const data = await this.purchaseService.findPurchaseById(id)
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async deletePurchase(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.purchaseService.findPurchaseById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "Purchase not found");
            }
            const isDeleted = await this.purchaseService.deletePurchase(id);
            if (!isDeleted.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            return this.httpResponse.Ok(res, isExist)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

}
