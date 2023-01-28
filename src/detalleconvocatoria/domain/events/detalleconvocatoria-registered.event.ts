
export class DetalleConvocatoriaRegistered  {
    constructor(
      public readonly id: number,
      public readonly convocatoriaId: number,
      public readonly postulanteId: number,
    ) {
    }
  }