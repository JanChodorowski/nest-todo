import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
// import { Task, TaskStatus } from './task.model';
import {CreateTaskDto} from './dto/create-task.dto';
import { Task } from './task.entity'
// import { Repository } from 'typeorm';
// import { TaskStatus } from './types/taskStatus';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {

  constructor(
     @InjectRepository(TaskRepository)
     private taskRepository: TaskRepository,
  ){}


  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

//  private tasks: Task[] = [];

  // getAllTasts(): Task[] {
  //   return this.tasks;
  // }

  async createTask(
    createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }


  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task{
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
