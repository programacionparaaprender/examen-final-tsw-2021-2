import { GetConvocatoriaQuery } from '../../queries/get-convocatoria.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';

import { GetConvocatoriaDto } from '../../dtos/queries/get-convocatoria.dto';

@QueryHandler(GetConvocatoriaQuery)
export class GetConvocatoriaHandler implements IQueryHandler<GetConvocatoriaQuery> {
  constructor() {}

  async execute(query: GetConvocatoriaQuery) {
    const manager = getManager();
    //sql server
    var sql = " SELECT [id],[convocatoriaName],[created_at],[created_by],[updated_at],[updated_by],[state] FROM [convocatorias] where state in (1, 2)";
    
    sql = " SELECT id,convocatoriaName,created_at,created_by,updated_at,updated_by,state FROM convocatorias where state in (1, 2)";
    
    
    const ormConvocatoria = await manager.query(sql);
    if (ormConvocatoria.length <= 0) {
      return [];
    }
    const convocatorias: GetConvocatoriaDto[] = ormConvocatoria.map(function (ormCustomer) {
      let convocatoriaDto = new GetConvocatoriaDto();
      convocatoriaDto.id = Number(ormCustomer.id);
      convocatoriaDto.convocatoriaName = ormCustomer.convocatoriaName;
      convocatoriaDto.createdAt = ormCustomer.createdAt;
      convocatoriaDto.createdBy = ormCustomer.createdBy;
      convocatoriaDto.updatedAt = ormCustomer.updatedAt;
      convocatoriaDto.updatedBy = ormCustomer.updatedBy;
      convocatoriaDto.state = ormCustomer.state;
      return convocatoriaDto;
    });
    return convocatorias;
  }
}