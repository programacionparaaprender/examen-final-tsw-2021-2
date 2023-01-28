export class RegisterConvocatoriaResponse {
    constructor(
        public id: number,
        public readonly convocatoriaName: string,
        public readonly createdBy: number,
    ) {}
}
