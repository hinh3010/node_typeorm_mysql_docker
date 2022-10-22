import { Request, Response } from "express";
import { HttpResponse } from "../shared/response/http.response";
import { CustomerService } from "./customer.service";

export class CustomerController {

    constructor(
        private readonly customerService: CustomerService = new CustomerService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getCustomers(req: Request, res: Response) {
        try {
            const data = await this.customerService.findAllCustomers();
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async getCustomerById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.customerService.findCustomerById(id);
            if (data)
                return this.httpResponse.Ok(res, data)
            return this.httpResponse.NotFound(res, "Customer not found")
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async createCustomer(req: Request, res: Response) {
        try {
            const data = await this.customerService.createCustomer(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async updateCustomer(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.customerService.findCustomerById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "Customer not found");
            }
            const isUpdated = await this.customerService.updateCustomer(id, req.body);
            if (!isUpdated.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            const data = await this.customerService.findCustomerById(id)
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async deleteCustomer(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.customerService.findCustomerById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "Customer not found");
            }
            const isDeleted = await this.customerService.deleteCustomer(id);
            if (!isDeleted.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            return this.httpResponse.Ok(res, isExist)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

}
