import { Module } from '@nestjs/common';
import { TaskListsController } from './taskLists.controller';
import { TaskListsService } from './taskLists.service';
import { taskListsProviders } from './taskLists.providers';
import { DatabaseModule } from '../module';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskListsController],
  providers: [
    TaskListsService,
    ...taskListsProviders,
  ],
})
export class TaskListsModule {}