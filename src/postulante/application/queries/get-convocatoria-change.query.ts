export class GetConvocatoriaChangeQuery {
    public constructor(
        public readonly convocatoriaId: number,
        public readonly state: number,
        public readonly updatedBy: number) {}
}