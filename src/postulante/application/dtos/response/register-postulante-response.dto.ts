export class RegisterPostulanteResponse {
    constructor(
      public id: number,
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly dni: string
    ) {}
  }