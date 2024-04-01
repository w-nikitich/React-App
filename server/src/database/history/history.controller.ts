import { Controller, Delete, Patch, Post, Get, Param, Body } from '@nestjs/common';
import { HistoryService } from './history.service';
import { updateHistoryRequest } from '../dto/updateHistory.request';

  @Controller('history')
  export class HistoryController {
      constructor (private readonly historyService: HistoryService){}

      @Get()
      findAll(): object {
        return this.historyService.findAll();
      } 
      
      @Get(':id')
      findOne(@Param('id') id: number): object {
        return this.historyService.findOne(id);
      } 

      @Post()
      create(@Body() data: updateHistoryRequest): object {
        return this.historyService.create(data);  
      }

      @Delete(':id')
      destroy(@Param('id') id: number): object {
        return this.historyService.destroy(id);
      }
  }