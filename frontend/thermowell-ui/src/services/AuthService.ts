import BaseService from '../utils/baseService';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  email: string;
  token: string;
}

export default class AuthService extends BaseService {
  static async login(credentials: AuthRequest): Promise<string> {
    return this.post<AuthRequest, string>('/api/auth/login', credentials);
  }

  static async register(details: RegisterRequest): Promise<boolean> {
    return this.post<RegisterRequest, boolean>('/api/auth/register', details);
  }

  static async forgotPassword(request: ForgotPasswordRequest): Promise<boolean> {
    return this.post<ForgotPasswordRequest, boolean>('/api/auth/forgot-password', request);
  }

  static async resetPassword(request: ResetPasswordRequest): Promise<boolean> {
    return this.post<ResetPasswordRequest, boolean>('/api/auth/reset-password', request);
  }

  static async verifyEmail(request: VerifyEmailRequest): Promise<boolean> {
    return this.post<VerifyEmailRequest, boolean>('/api/auth/verify-email', request);
  }
}
