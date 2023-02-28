import { Status } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { from, concatMap } from 'rxjs';
import { LogDTO } from './task.dto';
import { PrismaService } from '@nestboot/prisma';
@Injectable()
export class TaskDAO {
  constructor(private readonly prismaService: PrismaService) {}

  $createTaskByAgentId(agentId: string) {
    const agent = this.prismaService.agent.findFirst({
      select: {
        name: true,
      },
      where: {
        id: agentId,
      },
    });
    return from(agent).pipe(
      concatMap((agentResult) => {
        return this.prismaService.agent.update({
          data: {
            task: {
              create: {
                name: `TASK_${agentResult.name}`,
                status: Status.DOWNLOAD_AGENT,
                progress: 0,
                step: 'begin task',
              },
            },
          },
          select: {
            task_id: true,
          },
          where: {
            id: agentId,
          },
        });
      }),
    );
  }

  $updateTask(taskId: string, step: string, status: Status, progress: number) {
    const updateTask = this.prismaService.agent.update({
      data: {
        task: {
          update: {
            status,
            progress,
            step,
          },
        },
      },
      where: {
        id: taskId,
      },
    });
    return from(updateTask);
  }

  $insertLog(log: LogDTO) {
    const updateTaskLog = this.prismaService.task.update({
      data: {
        log: {
          create: {
            message: log.message,
          },
        },
      },
      where: {
        id: log.task_id,
      },
    });
    return from(updateTaskLog);
  }
}
