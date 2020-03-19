import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import {CreateTaskDto} from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasts(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const {title,desc} = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      desc,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const found =  this.tasks.find(task=> task.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task{
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
