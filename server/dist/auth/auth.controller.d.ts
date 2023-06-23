import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    authenticate(request: RequestWithUser): import("../users/user.entity").default;
    getAllUsers(): Promise<import("../users/user.entity").default[]>;
    register(registrationData: RegisterDto): Promise<{
        status: string;
    }>;
    login(request: RequestWithUser, response: Response): Promise<Response<any, Record<string, any>>>;
    logout(request: RequestWithUser, response: Response): Promise<Response<any, Record<string, any>>>;
}
