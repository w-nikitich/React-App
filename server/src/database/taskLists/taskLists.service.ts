import { Injectable, Inject } from '@nestjs/common';
import { TaskList } from './taskLists.entity';
import { updateTaskListRequest } from '../dto/updateTaskList.request';

@Injectable()
export class TaskListsService {
  constructor(
    @Inject('TASK_LISTS_REPOSITORY')
    private taskListsRepository: typeof TaskList
  ) {}

  async findAll(): Promise<TaskList[]> {
    return this.taskListsRepository.findAll<TaskList>({order: [['createdAt', 'ASC']]});
  }

  async findOne(id: number): Promise<TaskList> {
    return this.taskListsRepository.findOne<TaskList>({where: {id}});
  }

  async create(data: {name: string, amount: number}): Promise<TaskList> {
    return this.taskListsRepository.create<TaskList>({name: data.name, amount: data.amount});
  }

  async update(id: number, data: updateTaskListRequest): Promise<TaskList> {
    await this.taskListsRepository.update<TaskList>({name: data.name}, {where: {id}})
    return this.taskListsRepository.findOne<TaskList>({where: {id}})
  }

  async destroy(id: number): Promise<number> {  
    return this.taskListsRepository.destroy<TaskList>({where: {id}});
  }
}
