import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class History extends Model {
  @Column
  taskId: number;

  @Column
  taskName: string;

  @Column
  oldData: string;

  @Column
  newData: string;

  @Column
  listId: number;

  @Column
  listName: string;

  @Column
  type: string;

  @Column
  text: string;
}