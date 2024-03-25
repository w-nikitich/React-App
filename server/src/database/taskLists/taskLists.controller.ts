import { Controller, Delete, Patch, Post, Get, Param, Body } from '@nestjs/common';
import { TaskListsService } from './taskLists.service';
import { updateTaskListRequest } from '../dto/updateTaskList.request';

  @Controller('taskLists')
  export class TaskListsController {
      constructor (private readonly taskListsService: TaskListsService){}

      @Get()
      findAll(): object {
        return this.taskListsService.findAll();
      } 
      
      @Get(':id')
      findOne(@Param('id') id: number): object {
        return this.taskListsService.findOne(id);
      } 

      @Post()
      create(): object {
        return this.taskListsService.create();  
      }

      @Patch(':id')
      update(@Param('id') id: number, @Body() data: updateTaskListRequest): object {
        return this.taskListsService.update(id, data);
      }

      @Delete(':id')
      destroy(@Param('id') id: number): object {
        return this.taskListsService.destroy(id);
      }
  }