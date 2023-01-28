export class EditConvocatoriaResponse {
    constructor(
        public id: number,
        public readonly convocatoriaName: string,
        public readonly createdBy: number,
        public readonly createdAt: string,
        public readonly updatedBy: number,
        public readonly updatedAt: string,
        public readonly state: number,
    ) {}
}
