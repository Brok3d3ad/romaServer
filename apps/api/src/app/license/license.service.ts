import { Injectable } from '@nestjs/common';
import { License } from './entities/license.entity';
import { LicenseStatus } from './entities/license.entity';

@Injectable()
export class LicenseService {
  async check(): Promise<License> {
    // Here you would typically fetch from a database
    // This is a mock implementation
    return {
      key: '00000000-0000-0000-0000-000000000000',
      expired: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: LicenseStatus.ACTIVE,
    };
  }
} 