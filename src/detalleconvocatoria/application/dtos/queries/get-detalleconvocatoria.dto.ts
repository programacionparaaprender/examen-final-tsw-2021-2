
export class GetDetalleConvocatoriaDto {
    public id: number;
    public convocatoria_id: number;
    public postulante_id: number; 
    public createdAt: string;
    public createdBy: number;
    public updatedAt: string;
    public updatedBy: number;
    public state: number;
    public calificacion: number;
    public first_name: string;
	public last_name: string;
	public dni: string;
}