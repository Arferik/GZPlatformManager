import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskDAO } from './task.dao';

@Module({
  providers: [TaskService, TaskDAO],
  controllers: [TaskController],
})
export class TaskModule {}
