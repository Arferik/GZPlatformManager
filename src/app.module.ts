import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AgentModule } from './modules/agent';
import { SshModule } from './modules/ssh';
import { CONFIG, ConfigModule } from '@ddboot/config';
import { LoggerModule } from '@ddboot/log4js';
import { PrismaModule } from '@nestboot/prisma';

@Module({
  imports: [
    SshModule,
    ConfigModule.forRoot({}),
    LoggerModule.forRootAsync({
      inject: [CONFIG],
    }),
    PrismaModule.forRootAsync({
      inject: [CONFIG],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AgentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
