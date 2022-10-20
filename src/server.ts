import cors from "cors";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { ConfigServer } from "./config/config";
import { UserRouter } from './routers/user.router';

class Server extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT');

    constructor() {
        super()
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan("dev"));

        this.dbConnect()

        this.app.use(
            cors({
                origin: true,
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
                credentials: true,
            })
        );

        this.app.get('/', (req: express.Request, res: express.Response) => {
            // throw new Error("Not implemented");
            res.json({
                message: 'hello three'
            })
        })
        this.app.use('/v1', this.routers())
        this.app.use((err: any, req: express.Request, res: express.Response, next: any) => {
            res.json({
                status: err.status || 500,
                message: err.message
            })
        })

        this.listen();
    }

    // async dbConnect(): Promise<DataSource | void> {
    //     return this.initConnect
    //         .then(() => {
    //             console.log("Connect Success");
    //         })
    //         .catch((err :unknown) => {
    //             console.error(err);
    //         });
    // }

    async dbConnect(): Promise<Connection | void> {
        return await createConnection(this.typeOrmConfig)
    }

    routers(): Array<express.Router> {
        return [
            new UserRouter().router
        ]
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(
                `http://localhost:${this.port}/`
            );
        });
    }
}

new Server()