export class RegisterConvocatoriaRequest {
    constructor(
        public readonly convocatoriaName: string,
        public readonly createdBy: number,
    ) {}
  }