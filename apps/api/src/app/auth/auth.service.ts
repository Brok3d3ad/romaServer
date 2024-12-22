import { Injectable } from '@nestjs/common';
import { AuthRequestDto } from './dto/auth-request.dto';
import { License } from '../license/entities/license.entity';

@Injectable()
export class AuthService {
  async signin(authRequestDto: AuthRequestDto): Promise<License> {
    // Implement your authentication logic here
    throw new Error('Method not implemented');
  }
} 