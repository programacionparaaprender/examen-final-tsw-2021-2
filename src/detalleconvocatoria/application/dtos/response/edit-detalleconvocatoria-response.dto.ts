export class EditDetalleConvocatoriaResponse {
    constructor(
        public readonly detalleConvocatoriaId: number,
        public readonly postulanteId: number,
        public readonly convocatoriaId: number,
        public readonly createdBy: number,
        public readonly createdAt: string,
        public readonly updatedBy: number,
        public readonly updatedAt: string,
        public readonly state: number,
    ) {}
  }