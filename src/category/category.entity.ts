import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../shared/entities/base.entity";
import { ProductEntity } from "../product/product.entity";

@Entity({ name: "category" })
export class CategoryEntity extends BaseEntity {
    @Column()
    categoryName!: string;

    // quan he 1 - nhieu voi table product
    @OneToMany(() => ProductEntity, (product) => product.category)
    products!: ProductEntity[];
}
