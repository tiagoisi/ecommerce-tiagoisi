import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { config as dotevConfig } from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../roles.enum';
dotevConfig({ path: '.env.development' });

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No se envio un token');
    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      payload.exp = new Date(payload.exp * 1000);
      payload.roles = payload.isAdmin ? [Role.Admin] : [Role.User];
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Error al validar token');
    }
  }
}
