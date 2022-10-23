import { AuthService } from "../services/auth.service";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { PassportUse } from "../utils/passport.use";
import { UserEntity } from "../../user/user.entity";

const authService: AuthService = new AuthService();

export class LoginStrategy {
    async validate(
        name: string,
        password: string,
        done: any
    ): Promise<UserEntity> {

        const user = await authService.validateUser(name, password);
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    }

    get use() {
        return PassportUse<LocalStrategy, Object, VerifyFunction>(
            "login",
            LocalStrategy,
            {
                usernameField: "name",
                passwordField: "password",
            },
            this.validate
        );
    }
}
