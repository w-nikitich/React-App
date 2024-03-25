import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Task extends Model {
  @Column
  name: string;

  @Column
  status: string;

  @Column
  date: string;

  @Column
  priority: string;

  @Column
  description: string;
}