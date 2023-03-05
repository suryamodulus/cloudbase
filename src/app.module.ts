import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { DatabaseModule } from './database/database.module';
import { ServicesModule } from './services/services.module';
import { BullModule } from '@nestjs/bull';
import { config } from './config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    BullModule.forRoot({
      redis: {
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
      },
    }),
    AuthModule,
    ProjectsModule,
    ServicesModule,
  ],
  providers: [AppController],
})
export class AppModule {}
