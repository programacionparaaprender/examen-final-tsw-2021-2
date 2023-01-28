export class EditDetalleConvocatoriaRequest {
    constructor(
        public readonly postulanteId: number,
        public readonly convocatoriaId: number,
        public readonly updatedBy: number,
    ) {}
  }