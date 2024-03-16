import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoUseCase {
  execute(id: number): Promise<TodoEntity | null>;
}

export class GetTodo implements GetTodoUseCase {
  constructor(private readonly repositoy: TodoRepository) {}

  public async execute(id: number): Promise<TodoEntity | null> {
    return this.repositoy.findById(id);
  }
}
