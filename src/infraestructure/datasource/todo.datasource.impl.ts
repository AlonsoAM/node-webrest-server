import { prisma } from "../../data/postgres";
import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDataSourceImpl extends TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({ data: createTodoDto! });
    return TodoEntity.fromObject(todo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany({ orderBy: { id: "asc" } });
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }
  async findById(id: number): Promise<TodoEntity | null> {
    const todo = await prisma.todo.findUnique({ where: { id: +id } });
    return todo ? TodoEntity.fromObject(todo) : null;
  }
  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);
    const todoUpdated = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values,
    });
    return TodoEntity.fromObject(todoUpdated);
  }
  async delete(id: number): Promise<boolean> {
    await this.findById(id);
    await prisma.todo.delete({ where: { id } });
    return true;
  }
}
