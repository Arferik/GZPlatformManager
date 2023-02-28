import { Message } from '@nestboot/core';
import { Body, Controller, Post, Put } from '@nestjs/common';
import { LogDTO, TaskDTO, UpdateTaskDTO } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * 模块/模块id
   * @param taskIdDTO
   * @returns
   */
  @Post()
  @Message('create task success')
  createTask(@Body() taskIdDTO: TaskDTO) {
    return this.taskService.createTask(taskIdDTO);
  }

  @Put()
  @Message('update task success')
  updateTask(@Body() taskAgent: UpdateTaskDTO) {
    return this.taskService.updateTask(taskAgent);
  }

  @Post('log')
  @Message('create log success')
  createTaskLog(@Body() logDTO: LogDTO) {
    return this.taskService.insertTaskLog(logDTO);
  }
}
