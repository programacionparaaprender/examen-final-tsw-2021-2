import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetConvocatoriaDto } from '../../dtos/queries/get-convocatoria.dto';
import { GetConvocatoriaChangeQuery } from '../../queries/get-convocatoria-change.query';

@QueryHandler(GetConvocatoriaChangeQuery)
export class GetConvocatoriaByIdHandler implements IQueryHandler<GetConvocatoriaChangeQuery> {
  constructor() {}

  async execute(query: GetConvocatoriaChangeQuery) {
    const manager = getManager();
    var sql = 'update convocatorias set state = '+String(query.state) + ', updated_by=' + String(query.updatedBy);
    sql = sql + ' where id ='+String(query.convocatoriaId)+';';
    //const ormAccounts = await manager.query(sql, [query.convocatoriaId]);
    const ormAccounts = await manager.query(sql);
    if (ormAccounts.length <= 0) {
      return {};
    }
    const ormCustomer = ormAccounts[0];
    let convocatoriaDto = new GetConvocatoriaDto();
    convocatoriaDto.id = Number(ormCustomer.id);
    convocatoriaDto.convocatoriaName = ormCustomer.firstName;
    convocatoriaDto.createdAt = ormCustomer.createdAt;
    convocatoriaDto.createdBy = ormCustomer.createdBy;
    convocatoriaDto.updatedAt = ormCustomer.updatedAt;
    convocatoriaDto.updatedBy = ormCustomer.updatedBy;
    convocatoriaDto.state = ormCustomer.state;
    return convocatoriaDto;
  }
}