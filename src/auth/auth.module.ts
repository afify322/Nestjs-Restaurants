import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './JwtInterceptor';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '10d' },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [PassportModule, LocalStrategy, AuthService],
})
export class AuthModule {}
