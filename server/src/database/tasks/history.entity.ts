import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class History extends Model {
  @Column
  taskId: number;

  @Column
  taskOld: string;

  @Column
  taskNew: string;
}