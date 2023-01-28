import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetPostulantesDto } from '../../dtos/queries/get-postulantes.dto';
import { GetPostulanteIdQuery } from '../../queries/get-postulanteid.query';

@QueryHandler(GetPostulanteIdQuery)
export class GetPostulanteByIdHandler implements IQueryHandler<GetPostulanteIdQuery> {
  constructor() {}

  async execute(query: GetPostulanteIdQuery) {
    const manager = getManager();
    //sql server
    var sql = ' SELECT [id],[first_name],[last_name],[dni],[created_at],[created_by],[updated_at],[updated_by],[state] FROM [postulantes] where id ='+String(query.postulanteId)+';';
    //mysql
    sql = " SELECT id,first_name,last_name,dni,created_at,created_by,updated_at,updated_by,state FROM postulantes where id ="+String(query.postulanteId)+";";
    

    //const ormAccounts = await manager.query(sql, [query.convocatoriaId]);
    const ormAccounts = await manager.query(sql);
    if (ormAccounts.length <= 0) {
      return {};
    }
    const ormCustomer = ormAccounts[0];
    let convocatoriaDto = new GetPostulantesDto();
    convocatoriaDto.id = Number(ormCustomer.id);
    convocatoriaDto.first_name = ormCustomer.first_name;
    convocatoriaDto.last_name = ormCustomer.last_name;
    convocatoriaDto.dni = ormCustomer.dni;
    convocatoriaDto.createdAt = ormCustomer.created_at;
    convocatoriaDto.createdBy = ormCustomer.created_by;
    convocatoriaDto.updatedAt = ormCustomer.updated_at;
    convocatoriaDto.updatedBy = ormCustomer.updated_by;
    convocatoriaDto.state = ormCustomer.state;
    return convocatoriaDto;
  }
}