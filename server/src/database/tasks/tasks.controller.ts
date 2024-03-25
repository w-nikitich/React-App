import { Controller, Delete, Patch, Post, Get, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { updateTaskRequest } from '../dto/updateTask.request';

  @Controller('tasks')
  export class TasksController {
      constructor (private readonly tasksService: TasksService){}

      @Get()
      findAll(): object {
        return this.tasksService.findAll();
      } 
      
      @Get(':id')
      findOne(@Param('id') id: number): object {
        return this.tasksService.findOne(id);
      } 

      @Post()
      create(): object {
        return this.tasksService.create();  
      }

      @Patch(':id')
      update(@Param('id') id: number, @Body() data: updateTaskRequest): object {
        return this.tasksService.update(id, data);
      }

      @Delete(':id')
      destroy(@Param('id') id: number): object {
        return this.tasksService.destroy(id);
      }
  }
