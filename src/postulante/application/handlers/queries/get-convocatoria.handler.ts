import { GetConvocatoriaQuery } from '../../queries/get-convocatoria.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';

import { GetConvocatoriaDto } from '../../dtos/queries/get-convocatoria.dto';

@QueryHandler(GetConvocatoriaQuery)
export class GetConvocatoriaHandler implements IQueryHandler<GetConvocatoriaQuery> {
  constructor() {}

  async execute(query: GetConvocatoriaQuery) {
    const manager = getManager();
    const sql = " SELECT [id],[convocatoriaName],[created_at],[created_by],[updated_at],[updated_by],[state] FROM [convocatorias] where state in (1, 2)";
    const ormConvocatoria = await manager.query(sql);
    if (ormConvocatoria.length <= 0) {
      return [];
    }
    const convocatorias: GetConvocatoriaDto[] = ormConvocatoria.map(function (ormCustomer) {
      let convocatoriaDto = new GetConvocatoriaDto();
      convocatoriaDto.id = Number(ormCustomer.id);
      convocatoriaDto.convocatoriaName = ormCustomer.convocatoriaName;
      convocatoriaDto.createdAt = ormCustomer.created_at;
      convocatoriaDto.createdBy = ormCustomer.created_by;
      convocatoriaDto.updatedAt = ormCustomer.updated_at;
      convocatoriaDto.updatedBy = ormCustomer.updated_by;
      convocatoriaDto.state = ormCustomer.state;
      return convocatoriaDto;
    });
    return convocatorias;
  }
}