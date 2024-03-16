import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  //Todo: paginación
  abstract getAll(): Promise<TodoEntity[]>;

  abstract findById(id: number): Promise<TodoEntity | null>;
  abstract update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
  abstract delete(id: number): Promise<boolean>;
}
