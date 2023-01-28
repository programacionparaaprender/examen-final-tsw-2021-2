import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetConvocatoriaDto } from '../../dtos/queries/get-convocatoria.dto';
import { GetConvocatoriaIdQuery } from '../../queries/get-convocatoriaid.query';

@QueryHandler(GetConvocatoriaIdQuery)
export class GetConvocatoriaByIdHandler implements IQueryHandler<GetConvocatoriaIdQuery> {
  constructor() {}

  async execute(query: GetConvocatoriaIdQuery) {
    const manager = getManager();
    var sql = ' SELECT [id],[convocatoriaName],[created_at],[created_by],[updated_at],[updated_by],[state] FROM [convocatorias] where id ='+String(query.convocatoriaId)+';';
    sql = " SELECT id,convocatoriaName,created_at,created_by,updated_at,updated_by,state FROM convocatorias where id ="+String(query.convocatoriaId)+';';
    
    //const ormAccounts = await manager.query(sql, [query.convocatoriaId]);
    const ormAccounts = await manager.query(sql);
    if (ormAccounts.length <= 0) {
      return {};
    }
    const ormCustomer = ormAccounts[0];
    let convocatoriaDto = new GetConvocatoriaDto();
    convocatoriaDto.id = Number(ormCustomer.id);
    convocatoriaDto.convocatoriaName = ormCustomer.convocatoriaName;
    convocatoriaDto.createdAt = ormCustomer.createdAt;
    convocatoriaDto.createdBy = ormCustomer.createdBy;
    convocatoriaDto.updatedAt = ormCustomer.updatedAt;
    convocatoriaDto.updatedBy = ormCustomer.updatedBy;
    convocatoriaDto.state = ormCustomer.state;
    return convocatoriaDto;
  }
}