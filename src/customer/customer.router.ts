import { BaseRouter } from "../shared/routers/router";
import { CustomerController } from "./customer.controller";
import { CustomerMiddleware } from "./customer.middleware";

export class CustomerRouter extends BaseRouter<CustomerController, CustomerMiddleware> {
    constructor() {
        super(CustomerController, CustomerMiddleware);
    }

    routes(): void {

        this.router.get("/customers", (req, res) =>
            this.controller.getCustomers(req, res)
        );

        this.router.get("/customer/:id", (req, res) =>
            this.controller.getCustomerById(req, res)
        );

        this.router.post("/customer",
            (req, res, next) => [this.middleware.customerValidator(req, res, next)],
            (req, res) => this.controller.createCustomer(req, res)
        );

        this.router.put("/customer/:id", (req, res) =>
            this.controller.updateCustomer(req, res)
        );

        this.router.delete("/customer/:id", (req, res) =>
            this.controller.deleteCustomer(req, res)
        );
    }
}
