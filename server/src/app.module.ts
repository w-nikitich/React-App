import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './database/tasks/tasks.module';
import { TaskListsModule } from './database/taskLists/taskLists.module';

@Module({
  imports: [TasksModule, TaskListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
