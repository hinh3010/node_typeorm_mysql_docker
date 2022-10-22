import { BaseRouter } from "../../shared/routers/router";
import { PurchaseController } from "../controllers/purchase.controller";


export class PurchaseRouter extends BaseRouter<PurchaseController> {
    constructor() {
        super(PurchaseController);
    }

    routes(): void {
        this.router.get("/purchases", (req, res) => this.controller.getPurchases(req, res));
        this.router.get("/purchase/:id", (req, res) =>
            this.controller.getPurchaseById(req, res)
        );
        this.router.post("/purchase", (req, res) =>
            this.controller.createPurchase(req, res)
        );
        this.router.put("/purchase/:id", (req, res) =>
            this.controller.updatePurchase(req, res)
        );
        this.router.delete("/purchase/:id", (req, res) =>
            this.controller.deletePurchase(req, res)
        );
    }
}
