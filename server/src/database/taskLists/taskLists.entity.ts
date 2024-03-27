import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class TaskList extends Model {  
  @Column
  name: string;

  @Column
  amount: number;
}