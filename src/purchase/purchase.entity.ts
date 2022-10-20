import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../shared/entities/base.entity";
import { CustomerEntity } from "../customer/customer.entity";
import { PurchaseProductEntity } from "./purchases-products.entity";

@Entity({ name: "purchase" })
export class PurchaseEntity extends BaseEntity {
    @Column()
    status!: string;

    @Column()
    paymentMethod!: string;

    // quan he nhieu - 1 voi Purchass
    @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
    @JoinColumn({ name: "customer_id" })
    customer!: CustomerEntity;

    // quan he 1 - nhieu voi table purchaseProduct
    @OneToMany(
        () => PurchaseProductEntity,
        (purchaseProduct) => purchaseProduct.purchase
    )
    purchaseProduct!: PurchaseProductEntity[];
}
