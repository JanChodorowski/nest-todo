import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { TaskStatus } from "./types/taskStatus";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  status: TaskStatus;
}
