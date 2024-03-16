import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
  //* Dependency Injection (DI)
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const todo = await this.todoRepository.findById(+id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const todo = await this.todoRepository.create(createTodoDto!);

    res.status(201).json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) {
      return res.status(400).json({ error });
    }

    const todo = await this.todoRepository.update(updateTodoDto!);
    res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await this.todoRepository.delete(+id);
    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(204).send();
  };
}
