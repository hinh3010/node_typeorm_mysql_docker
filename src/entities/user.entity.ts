import { BaseEntity } from "../config/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {

    @Column()
    userName !: string

    @Column()
    lastName!: string

    @Column({ nullable: true })
    jobPosition !: string

    @Column()
    phone !: string
}