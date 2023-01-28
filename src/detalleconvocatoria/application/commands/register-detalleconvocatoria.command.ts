export class RegisterDetalleConvocatoria {
    constructor(
      public readonly  convocatoriaId: number,
      public readonly postulanteId: number, 
      public readonly createdAt: string,
      public readonly createdBy: number,
      public readonly updatedAt: string,
      public readonly updatedBy: number
    ) {}
  }