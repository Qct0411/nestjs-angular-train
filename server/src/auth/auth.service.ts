import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    public async register(registrationData: RegisterDto) {
        const hashedpw = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.usersService.createUser({
              ...registrationData,
              password: hashedpw
            });
            createdUser.password = undefined;
            return createdUser;
          } catch (error) {
            if (error?.code === '23505') {
              throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
          }
    }

    public async getAllUsers() {
        const users = await this.usersService.getAllUsers();
        return users;
    }

    public async getAuthenticatedUser(email: string, hashedpw: string) {
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(user.password, hashedpw);
            user.password = undefined;
            return user;
          } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
          }
    }

    public async verifyPassword(hashedpw: string, password: string) {
        const matchpw = await bcrypt.compare(password, hashedpw);
        if (!matchpw) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayLoad = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;

    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
