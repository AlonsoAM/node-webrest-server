export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly CompletedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) {
      returnObj.text = this.text;
    }
    if (this.CompletedAt) {
      returnObj.CompletedAt = this.CompletedAt;
    }

    return returnObj;
  }

  public static create(props: {
    [key: string]: any;
  }): [string?, UpdateTodoDto?] {
    const { id, text, CompletedAt } = props;

    let newCompletedAt = CompletedAt;

    if (isNaN(+id) || +id < 1 || !id) {
      return ["ID must be a valid number!", undefined];
    }

    if (CompletedAt) {
      newCompletedAt = new Date(CompletedAt);
      if (newCompletedAt.toString() === "Invalid Date") {
        return ["Invalid date", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }
}
