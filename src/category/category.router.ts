import { BaseRouter } from "../shared/routers/router";
import { CategoryController } from "./category.controller";

export class CategoryRouter extends BaseRouter<CategoryController> {
    constructor() {
        super(CategoryController);
    }

    routes(): void {
        this.router.get("/categories", (req, res) =>
            this.controller.getCategories(req, res)
        );
        this.router.get("/category/:id", (req, res) =>
            this.controller.getCategoryById(req, res)
        );
        this.router.post("/category", (req, res) =>
            this.controller.createCategory(req, res)
        );
        this.router.put("/category/:id", (req, res) =>
            this.controller.updateCategory(req, res)
        );
        this.router.delete("/category/:id", (req, res) =>
            this.controller.deleteCategory(req, res)
        );
    }
}
