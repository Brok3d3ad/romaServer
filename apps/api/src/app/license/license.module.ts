import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LicenseController } from './license.controller';
import { LicenseService } from './license.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [LicenseController],
  providers: [LicenseService],
})
export class LicenseModule {} 