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
    return this.tasksRepository.findAll<Task>();
  }

  async findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne<Task>({where: {id}});
  }

  async create(): Promise<Task> {
    return this.tasksRepository.create<Task>();
  }

  async update(id: number, data: updateTaskRequest): Promise<Task> {
    await this.tasksRepository.update<Task>({data: data}, {where: {id}})
    return this.tasksRepository.findOne<Task>({where: {id}})
  }

  async destroy(id: number): Promise<number> {  
    return this.tasksRepository.destroy<Task>({where: {id}});
  }
}