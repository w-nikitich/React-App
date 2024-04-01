import { Injectable, Inject } from '@nestjs/common';
import { Task } from './tasks.entity';
import { updateTaskRequest } from '../dto/updateTask.request';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: typeof Task
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll<Task>({order: [['createdAt', 'DESC']]});
  }

  async findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne<Task>({where: {id}});
  }

  async create(data: updateTaskRequest): Promise<Task> {
    return this.tasksRepository.create<Task>({name: data.name, listId: data.listId, status: data.status, date: data.date, priority: data.priority, description: data.description  });
  }

  async update(id: number, data: updateTaskRequest): Promise<Task> {
    await this.tasksRepository.update<Task>(data, {where: {id}})
    return this.tasksRepository.findOne<Task>({where: {id}})
  }

  async destroy(id: number): Promise<Task> {  
    const destroyedTask = this.tasksRepository.findOne<Task>({where: {id}});
    this.tasksRepository.destroy<Task>({where: {id}});
    return destroyedTask
  }
}