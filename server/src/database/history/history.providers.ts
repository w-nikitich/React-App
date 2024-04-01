import { History } from './history.entity';

export const historyProviders = [
  {
    provide: 'HISTORY_REPOSITORY',
    useValue: History,
  },
];