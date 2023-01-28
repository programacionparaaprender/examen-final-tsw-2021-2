export class RegisterDetalleConvocatoriaResponse {
    constructor(
        public readonly detalleConvocatoriaId: number,
        public readonly postulanteId: number,
        public readonly convocatoriaId: number,
        public readonly createdBy: number,
        public readonly createdAt: string,
    ) {}
  }