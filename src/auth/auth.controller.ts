import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post()
  @ApiResponse({
    status: 200,
    description: 'authenticated user',
  })
  @ApiResponse({
    status: 401,
    description: 'User not authenticated',
  })
  @ApiOperation({ summary: 'user authentication' })
  async login(@Req() req: any) {
    const token = await this.authService.login(req.user);
    return token;
  }
}
