import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { historyProviders } from './history.providers';
import { DatabaseModule } from '../module';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoryController],
  providers: [
    HistoryService,
    ...historyProviders,
  ],
})
export class HistoryModule {}