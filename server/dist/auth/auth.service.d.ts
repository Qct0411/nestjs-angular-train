import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registrationData: RegisterDto): Promise<import("../users/user.entity").default>;
    getAllUsers(): Promise<import("../users/user.entity").default[]>;
    getAuthenticatedUser(email: string, hashedpw: string): Promise<import("../users/user.entity").default>;
    verifyPassword(hashedpw: string, password: string): Promise<void>;
    getCookieWithJwtToken(userId: number): string;
    getCookieForLogOut(): string;
}
