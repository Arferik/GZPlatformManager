import { AGENT_MODULE, APP_MODULE } from './task.constant';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { TaskDAO } from './task.dao';
import { UpdateTaskDTO, TaskDTO, LogDTO } from './task.dto';
import { ILogger, InjectLogger, Logger } from '@ddboot/log4js';
@Injectable()
export class TaskService {
  private log: Logger;
  constructor(
    private readonly taskDAO: TaskDAO,
    @InjectLogger() private logger: ILogger,
  ) {
    this.log = this.logger.getLogger(TaskService.name);
  }

  createTask(taskDTO: TaskDTO) {
    this.log.debug('create agent, agent id =', taskDTO);
    if (taskDTO.module === APP_MODULE) {
    } else if (taskDTO.module === AGENT_MODULE) {
      this.log.info('create agent task');
      return this.taskDAO.$createTaskByAgentId(taskDTO.moduleId).pipe(
        map(({ task_id }) => {
          return {
            task_id,
          };
        }),
      );
    }
  }

  updateTask(task: UpdateTaskDTO) {
    this.log.info('update agent task');
    return this.taskDAO
      .$updateTask(task.id, task.step, task.status, task.progress)
      .pipe(
        map(() => {
          return {
            task_id: task.id,
          };
        }),
      );
  }

  insertTaskLog(log: LogDTO) {
    this.log.info('insert agent task');
    return this.taskDAO.$insertLog(log);
  }
}
