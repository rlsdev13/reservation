import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor( private authService : AuthService ){}

    @Post()
    async login(@Body() loginDto : LoginDto ) : Promise<{access_token : string}>{
        const valid = await this.authService.validateUser( loginDto );
        if( !valid ){
            throw new UnauthorizedException();
        }

        return await this.authService.generateAccessToken( loginDto.email );
    }

}
