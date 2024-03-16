import { TodoRepository } from "../../repositories/todo.repository";

export interface DeleteTodoUseCase {
  execute(id: number): Promise<boolean>;
}

export class DeteleTodo implements DeleteTodoUseCase {
  constructor(private readonly repositoy: TodoRepository) {}

  public async execute(id: number): Promise<boolean> {
    return this.repositoy.delete(id);
  }
}
