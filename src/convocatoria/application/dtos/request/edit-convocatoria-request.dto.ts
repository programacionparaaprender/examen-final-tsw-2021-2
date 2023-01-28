export class EditConvocatoriaRequest {
    constructor(
        public readonly convocatoriaName: string,
        public readonly updatedBy: number,
    ) {}
  }