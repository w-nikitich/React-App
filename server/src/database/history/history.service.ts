import { Injectable, Inject } from '@nestjs/common';
import { History } from './history.entity';
import { updateHistoryRequest } from '../dto/updateHistory.request';

@Injectable()
export class HistoryService {
  constructor(
    @Inject('HISTORY_REPOSITORY')
    private historyRepository: typeof History
  ) {}

  async findAll(): Promise<History[]> {
    return this.historyRepository.findAll<History>({order: [['createdAt', 'DESC']]});
  }

  async findOne(id: number): Promise<History> {
    return this.historyRepository.findOne<History>({where: {id}});
  }

  async create(data: updateHistoryRequest): Promise<History> {
    return this.historyRepository.create<History>({taskId: data?.taskId, taskName: data?.taskName, listId: data?.listId, listName: data?.listName, oldData: data?.oldData, newData: data?.newData, type: data.type, text: data?.text});
  }

  async destroy(id: number): Promise<number> {  
    return this.historyRepository.destroy<History>({where: {id}});
  }
}