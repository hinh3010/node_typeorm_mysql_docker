import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseProductDto } from "../dto/purchase-product.dto";

export class PurchaseProductMiddleware {

    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    purchaseProductValidator(req: Request, res: Response, next: NextFunction) {
        const { quantityProduct, totalPrice, purchase, product } = req.body;

        const valid = new PurchaseProductDto();
        valid.quantityProduct = quantityProduct;
        valid.totalPrice = totalPrice;
        valid.purchase = purchase;
        valid.product = product;

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, err);
            } else {
                next();
            }
        });
    }

}
