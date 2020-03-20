import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./types/taskStatus";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const {title, desc} = createTaskDto;
    const task = new Task();
    task.title = title;
    task.desc = desc;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }


  async getTasks(filterDto: GetTasksFilterDto): Promise<Array<Task>> {
    const {status, search} = filterDto;

    const query = this.createQueryBuilder('task'); // keyword used within query refeing to entitu

    if (status) {
      query.andWhere('task.status = :status', {status})
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.desc LIKE :search)', {search: `%${search}`});
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
