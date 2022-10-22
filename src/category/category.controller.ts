import { Request, Response } from "express";
import { HttpResponse } from "../shared/response/http.response";
import { CategoryService } from "./category.service";

export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService = new CategoryService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getCategories(req: Request, res: Response) {
        try {
            const data = await this.categoryService.findAllCategoties();
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async getCategoryById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.categoryService.findCategoryById(id);
            if (!data)
                return this.httpResponse.NotFound(res, "Category not found")
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const data = await this.categoryService.createCategory(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async updateCategory(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.categoryService.findCategoryById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "Category not found");
            }
            const isUpdated = await this.categoryService.updateCategory(id, req.body);
            if (!isUpdated.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            const data = await this.categoryService.findCategoryById(id)
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const isExist = await this.categoryService.findCategoryById(id)
            if (!isExist) {
                return this.httpResponse.NotFound(res, "Category not found");
            }
            const isDeleted = await this.categoryService.deleteCategory(id);
            if (!isDeleted.affected) {
                return this.httpResponse.Error(res, "Something went wrong");
            }
            return this.httpResponse.Ok(res, isExist)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }
}
