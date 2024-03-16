import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  CreateTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
  DeteleTodo,
} from "../../domain";

export class TodosController {
  //* Dependency Injection (DI)
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => {
        res.json(todos);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;

    new GetTodo(this.todoRepository)
      .execute(+id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).json({ message: "Todo not found" });
        }
        res.json(todo);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => {
        res.status(201).json(todo);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) {
      return res.status(400).json({ error });
    }

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => {
        if (!todo) {
          return res.status(404).json({ message: "Todo not found" });
        }
        res.json(todo);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    new DeteleTodo(this.todoRepository)
      .execute(+id)
      .then((result) => {
        if (!result) {
          return res.status(404).json({ message: "Todo not found" });
        }
        res.status(204).end();
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };
}
