import { TaskList } from './taskLists.entity';

export const taskListsProviders = [
  {
    provide: 'TASK_LISTS_REPOSITORY',
    useValue: TaskList,
  },
];