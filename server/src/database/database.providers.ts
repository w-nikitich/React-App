import { Sequelize } from 'sequelize-typescript';
import { Task } from './tasks/tasks.entity';
import { TaskList } from './taskLists/taskLists.entity';
import  { History } from './tasks/history.entity';

export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'root',
          password: 'root',
          database: 'root',
        });
        sequelize.addModels([Task]);
        sequelize.addModels([TaskList]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ];

