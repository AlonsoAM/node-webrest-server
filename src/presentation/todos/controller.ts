import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", createdAt: new Date() },
  { id: 2, text: "Do homework", createdAt: null },
  { id: 3, text: "Go to the gym", createdAt: new Date() },
];

export class TodosController {
  //* Dependency Injection (DI)
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    (isNaN(+id) || +id < 1) &&
      res.status(400).json({ message: "ID argument is not a number!" });

    const todo = todos.find((todo) => todo.id === +id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }
    const newTodo = { id: todos.length + 1, text, createdAt: null };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  };
}
