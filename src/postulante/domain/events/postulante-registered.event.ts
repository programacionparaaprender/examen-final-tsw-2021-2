
export class PostulanteRegistered  {
  constructor(
    public readonly id: number,
    private readonly firstName: string,
    private readonly lastName: string,
    public readonly dni: string,
  ) {
  }
}