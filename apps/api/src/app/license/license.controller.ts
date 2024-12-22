import { Controller, Get, UseGuards } from '@nestjs/common';
import { LicenseService } from './license.service';
import { License } from './entities/license.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get('check')
  @UseGuards(AuthGuard)
  async check(): Promise<License> {
    return this.licenseService.check();
  }
} 