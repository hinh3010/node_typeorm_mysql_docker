import { BaseRouter } from "../../shared/routers/router";
import { PurchaseProductController } from "../controllers/purchase-product.controller";

export class PurchaseProductRouter extends BaseRouter<PurchaseProductController> {
    constructor() {
        super(PurchaseProductController);
    }

    routes(): void {
        this.router.get("/purchaseProducts", (req, res) =>
            this.controller.getPurchaseProducts(req, res)
        );
        this.router.get("/purchaseProduct/:id", (req, res) =>
            this.controller.getPurchaseProductById(req, res)
        );
        this.router.post("/purchaseProduct", (req, res) =>
            this.controller.createPurchaseProduct(req, res)
        );
        this.router.put("/purchaseProduct/:id", (req, res) =>
            this.controller.updatePurchaseProduct(req, res)
        );
        this.router.delete("/purchaseProduct/:id", (req, res) =>
            this.controller.deletePurchaseProduct(req, res)
        );
    }
}
