import { Body, Controller, Get, HttpCode, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthGuard } from './localAuth.guard';
import { Response } from 'express';
import JwtAuthGuard from './jwtAuth.guard';
import { config } from 'process';
import { ConfigService } from '@nestjs/config';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ){}
    @UseGuards(JwtAuthGuard)    
    @Get()
    authenticate(@Req() request: RequestWithUser){
        const user = request.user;
        user.password = undefined;
        return user;
    }

    @Get('getAllUsers')
    async getAllUsers(){
        return this.authService.getAllUsers();
    }

    @Post('register')
    async register(@Body() registrationData: RegisterDto){
        const result = await this.authService.register(registrationData);
        return {
            status: 'success'
        };
    }


    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() request: RequestWithUser, @Res() response: Response){
        const {user} = request;
        const cookie = this.authService.getCookieWithJwtToken(user.id);
        Logger.log(cookie);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send({
            email :user.email,
            cookie: cookie,
            expireIn: this.configService.get('JWT_EXPIRATION_TIME')
        });
    }


    @Post('logout')
    async logout(@Req() request: RequestWithUser, @Res() response: Response){
        Logger.log("logout");
        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        response.clearCookie('Cookie');
        return response.sendStatus(200);
    }
}
