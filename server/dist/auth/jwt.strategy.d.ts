import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UsersService);
    validate(payload: TokenPayLoad): Promise<import("../users/user.entity").default>;
}
export {};
