export interface JwtPayload {
  sub: string;  // license key
  login: string;
  iat?: number;  // issued at
  exp?: number;  // expiration time
} 