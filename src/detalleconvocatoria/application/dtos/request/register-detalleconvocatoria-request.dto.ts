export class RegisterDetalleConvocatoriaRequest {
    constructor(
        public readonly postulanteId: number,
        public readonly convocatoriaId: number,
        public readonly createdBy: number,
    ) {}
  }