export class GetDetalleConvocatoriaQuery {
    public constructor(
        public readonly convocatoriaId: number,
        public readonly postulanteId: number) {}
}