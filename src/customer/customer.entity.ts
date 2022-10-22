import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../shared/entities/base.entity";
import { PurchaseEntity } from "../purchase/entities/purchase.entity";
import { UserEntity } from "../user/user.entity";
// import { PurchaseEntity } from "../../purchase/entitites/purchase.entity";

@Entity({ name: "customer" })
export class CustomerEntity extends BaseEntity {
    @Column()
    address!: string;

    @Column()
    dni!: number;

    // quan he 1 - 1 vs table user
    @OneToOne(() => UserEntity, (user) => user.customer)
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;

    // quan he 1 - nhieu voi Purchass
    @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
    purchases!: PurchaseEntity[];
}
