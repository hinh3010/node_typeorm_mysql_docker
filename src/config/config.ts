import * as dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export abstract class ConfigServer {

    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        console.log({ nodeNameEnv })
        dotenv.config({
            path: nodeNameEnv,
        });
    }

    // env
    public getEnvironment(k: string): string | undefined {
        console.log({ getEnvironment: k, value: process.env[k] });
        return process.env[k];
    }

    public getNumberEnv(k: string): number {
        console.log({ getNumberEnv: k, value: this.getEnvironment(k) });
        return Number(this.getEnvironment(k));
    }

    public get nodeEnv(): string {
        return this.getEnvironment("NODE_ENV")?.trim() || "";
    }

    public createPathEnv(path: string): string {
        const arrEnv: Array<string> = ["env"]; //['hola', 'mundo'] => 'hola.mundo'

        if (path.length > 0) {
            const stringToArray = path.split(".");
            arrEnv.unshift(...stringToArray);
        }
        console.log({ arrEnv });
        return "." + arrEnv.join(".");
    }


    // type orm
    public get typeOrmConfig(): ConnectionOptions {
        return {
            type: "mysql",
            host: this.getEnvironment("DB_HOST"),
            port: this.getNumberEnv("DB_PORT"),
            username: this.getEnvironment("DB_USER"),
            password: this.getEnvironment("DB_PASSWORD"),
            database: this.getEnvironment("DB_DATABASE"),
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../migrations/*{.ts,.js}"],
            synchronize: true,
            // migrationsRun: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy(),
        }
    }

}
