import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from "../../domain";

export class TodoRepositoryImpl extends TodoRepository {
  constructor(private readonly datasource: TodoDataSource) {
    super();
  }

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: number): Promise<TodoEntity | null> {
    return this.datasource.findById(id);
  }
  update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.update(updateTodoDto);
  }
  delete(id: number): Promise<boolean> {
    return this.datasource.delete(id);
  }
}
