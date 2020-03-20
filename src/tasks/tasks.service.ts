import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
// import { Task, TaskStatus } from './task.model';
import {CreateTaskDto} from './dto/create-task.dto';
import { Task } from './task.entity'
// import { Repository } from 'typeorm';
// import { TaskStatus } from './types/taskStatus';
import { TaskRepository } from './tasks.repository';
import { TaskStatus } from './types/taskStatus';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
     @InjectRepository(TaskRepository)
     private taskRepository: TaskRepository,
  ){}

    async getAllTasts(filterDto: GetTasksFilterDto): Promise<Array<Task>> {
      // return this.tasks;
      return this.taskRepository.getTasks(filterDto);
    }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTask(
    createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(id:number, status: TaskStatus): Promise<Task>  {
    const result = await this.getTaskById(id);
    result.status = status;
    await result.save();
    return result;
  }
}
