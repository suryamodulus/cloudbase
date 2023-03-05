import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BasicAuthStrategy } from './auth-basic.strategy';

@Module({
  imports: [PassportModule],
  providers: [BasicAuthStrategy],
})
export class AuthModule {}
