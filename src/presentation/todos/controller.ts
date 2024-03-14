import { Request, Response } from "express";

export class TodosController {
  //* Dependency Injection (DI)
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json([
      { id: 1, text: "Buy milk", createdAt: new Date() },
      { id: 2, text: "Do homework", createdAt: null },
      { id: 3, text: "Go to the gym", createdAt: new Date() },
    ]);
  };
}
