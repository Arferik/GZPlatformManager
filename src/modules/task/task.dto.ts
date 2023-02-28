import { Status } from '@prisma/client';
import { IsEmpty, IsString, IsNumber } from 'class-validator';

export class TaskDTO {
  @IsEmpty()
  @IsString()
  moduleId: string;

  @IsEmpty()
  @IsString()
  module: string;
}

export class UpdateTaskDTO {
  @IsEmpty()
  @IsString()
  id: string;
  @IsEmpty()
  @IsString()
  status: Status;
  @IsEmpty()
  @IsNumber()
  progress: number;
  @IsEmpty()
  @IsNumber()
  step: string;
}

export class LogDTO {
  @IsEmpty()
  @IsString()
  task_id: string;

  @IsEmpty()
  @IsString()
  message: string;
}
