import { GetDetalleConvocatoriaQuery } from '../../queries/get-detalleconvocatoria.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';

import { GetDetalleConvocatoriaDto } from '../../dtos/queries/get-detalleconvocatoria.dto';

@QueryHandler(GetDetalleConvocatoriaQuery)
export class GetDetalleConvocatoriaHandler implements IQueryHandler<GetDetalleConvocatoriaQuery> {
  constructor() {}

  async execute(query: GetDetalleConvocatoriaQuery) {
    const manager = getManager();
    //sql server
    var sql = " SELECT [id],[calificacion],[convocatoria_id],[postulante_id],[created_at],[created_by],[updated_at],[updated_by],[state] FROM [detalle_convocatoria] where state in (1, 2) and convocatoria_id="+String(query.convocatoriaId);
    sql = " SELECT detalle.id,detalle.calificacion,detalle.convocatoria_id,";
    sql = sql + "detalle.postulante_id,detalle.created_at,detalle.created_by,";
    sql = sql + "detalle.updated_at,detalle.updated_by,detalle.state,";
    sql = sql + "postulante.first_name,postulante.last_name,postulante.dni";
    sql = sql + " FROM detalle_convocatoria detalle";
    sql = sql + " inner join postulantes postulante on detalle.postulante_id=postulante.id";
    sql = sql + " where detalle.state in (1, 2)";
    if(query.convocatoriaId > 0){
        sql = sql + " and detalle.convocatoria_id="+String(query.convocatoriaId);
    }
    if(query.postulanteId > 0){
        sql = sql + " and detalle.postulante_id="+String(query.postulanteId);
    }
    const ormConvocatoria = await manager.query(sql);
    if (ormConvocatoria.length <= 0) {
      return [];
    }
    const convocatorias: GetDetalleConvocatoriaDto[] = ormConvocatoria.map(function (ormCustomer) {
      let convocatoriaDto = new GetDetalleConvocatoriaDto();
      convocatoriaDto.id = Number(ormCustomer.id);
      convocatoriaDto.convocatoria_id = ormCustomer.convocatoria_id;
      convocatoriaDto.postulante_id = ormCustomer.postulante_id;
      convocatoriaDto.createdAt = ormCustomer.createdAt;
      convocatoriaDto.createdBy = ormCustomer.createdBy;
      convocatoriaDto.updatedAt = ormCustomer.updatedAt;
      convocatoriaDto.updatedBy = ormCustomer.updatedBy;
      convocatoriaDto.calificacion = ormCustomer.calificacion;
      convocatoriaDto.state = ormCustomer.state;
      convocatoriaDto.first_name = ormCustomer.first_name;
      convocatoriaDto.last_name = ormCustomer.last_name;
      convocatoriaDto.dni = ormCustomer.dni;
      return convocatoriaDto;
    });
    return convocatorias;
  }
}