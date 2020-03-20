import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../types/taskStatus';

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
