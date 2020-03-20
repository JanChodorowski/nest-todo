import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';
 import {TasksService } from './tasks.service';
import { Task } from './task.entity';
import {CreateTaskDto} from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './types/taskStatus';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}

  @Get()
  async getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Array<Task>> {
    return this.tasksService.getAllTasts(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task>{
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task>{
    return this.tasksService.updateTaskStatus(id, status);
  }

}
