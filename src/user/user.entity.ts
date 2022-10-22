import { Column, Entity, OneToOne } from "typeorm";
import { CustomerEntity } from "../customer/customer.entity";
import { BaseEntity } from "../shared/entities/base.entity";
import { RoleType } from "./user.dto";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {

    @Column()
    name!: string

    @Column()
    lastName!: string

    @Column()
    email!: string

    @Column({ select: false })
    password!: string

    @Column()
    city!: string

    @Column()
    province !: string

    @Column({ type: 'enum', enum: RoleType, nullable: false })
    role!: RoleType

    // quan he 1 - 1 vs table customer
    @OneToOne(() => CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity;
}