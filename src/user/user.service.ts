import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../shared/services/base.service";
import { UserEntity } from "./user.entity";
import { RoleType, UserDto } from "./user.dto";
import * as bcrypt from "bcrypt";

export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity);
    }

    async findAllUser(): Promise<UserEntity[]> {
        return (await this.execRepository).find();
    }
    async findUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }
    async createUser(body: UserDto): Promise<UserEntity> {
        const newUser = (await this.execRepository).create(body);
        const hashPass = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashPass;
        return (await this.execRepository).save(newUser);
    }
    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }
    async updateUser(id: string, infoUpdate: UserDto): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    async findUserWithRelation(id: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.customer", "customer")
            .where({ id })
            .getOne();
    }

    async findUserWithRole(
        id: string,
        role: RoleType
    ): Promise<UserEntity | null> {
        const user = (await this.execRepository)
            .createQueryBuilder("user")
            .where({ id })
            .andWhere({ role })
            .getOne();

        return user;
    }


    async findByEmail(email: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where({ email })
            .getOne();
    }
    async findByUsername(name: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where({ name })
            .getOne();
    }
}


