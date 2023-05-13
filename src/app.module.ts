import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AgentModule } from './modules/agent';
import { SshModule } from './modules/ssh';
import { TaskModule } from './modules/task';
import { CONFIG, ConfigModule } from '@ddboot/config';
import { LoggerModule } from '@ddboot/log4js';
import { CryptoModule } from '@nestboot/crypto';
import { PrismaModule } from '@nestboot/prisma';

@Module({
  imports: [
    SshModule,
    TaskModule,
    ConfigModule.forRoot({}),
    LoggerModule.forRootAsync({
      inject: [CONFIG],
    }),
    PrismaModule.forRootAsync({
      inject: [CONFIG],
    }),
    CryptoModule.forRootAsync({
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
