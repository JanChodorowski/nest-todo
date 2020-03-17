import { PipeTransform, BadRequestException  } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform{
  readonly allowesStatuses = [
    TaskStatus.OPEN,
    TaskStatus.INPROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)){
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any){
    const index = this.allowesStatuses.indexOf(status);
    return index!== -1;
  }
}
