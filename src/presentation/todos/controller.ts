import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  //* Dependency Injection (DI)
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany({ orderBy: { id: "asc" } });
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    (isNaN(+id) || +id < 1) &&
      res.status(400).json({ message: "ID argument is not a number!" });

    const todo = await prisma.todo.findUnique({ where: { id: +id } });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const todo = await prisma.todo.create({ data: createTodoDto! });

    res.status(201).json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) {
      return res.status(400).json({ error });
    }

    const todo = await prisma.todo.findUnique({ where: { id: +id } });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const todoUpdated = await prisma.todo.update({
      where: { id: +id },
      data: updateTodoDto!.values,
    });

    res.json(todoUpdated);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    (isNaN(+id) || +id < 1) &&
      res.status(400).json({ message: "ID argument is not a number!" });

    const todo = await prisma.todo.findUnique({ where: { id: +id } });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await prisma.todo.delete({ where: { id: +id } });
    res.status(204).json();
  };
}
