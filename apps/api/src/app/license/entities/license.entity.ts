export enum LicenseStatus {
  ACTIVE = 'ACTIVE',
  UNACTIVE = 'UNACTIVE',
}

export class License {
  key: string;
  expired: Date;
  status: LicenseStatus;
  token?: string;
} 