export class RegisterConvocatoria {
    constructor(
      public readonly convocatoriaName: string,
      public readonly createdAt: string,
      public readonly createdBy: number,
      public readonly updatedAt: string,
      public readonly updatedBy: number
    ) {}
  }