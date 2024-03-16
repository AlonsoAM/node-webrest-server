import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repositoy: TodoRepository) {}

  public async execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.repositoy.create(dto);
  }
}
