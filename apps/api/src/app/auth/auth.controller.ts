import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { License } from '../license/entities/license.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() authRequestDto: AuthRequestDto): Promise<License> {
    return this.authService.signin(authRequestDto);
  }
} 