
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';

import { GetPostulantesDto } from '../../dtos/queries/get-postulantes.dto';
import { GetPostulantesQuery } from '../../queries/get-postulantes.query';

@QueryHandler(GetPostulantesQuery)
export class GetPostulantesHandler implements IQueryHandler<GetPostulantesQuery> {
  constructor() {}

  async execute(query: GetPostulantesQuery) {
    const manager = getManager();
    //sql server
    var sql = "SELECT [id],[first_name],[last_name],[dni],[created_at],[created_by],[updated_at],[updated_by],[state] FROM [postulantes] where state in (1)";
    //mysql
    sql = "SELECT id,first_name,last_name,dni,created_at,created_by,updated_at,updated_by,state FROM postulantes where state in (1)";
    
    const ormPostulante = await manager.query(sql);
    if (ormPostulante.length <= 0) {
      return [];
    }

    const convocatorias: GetPostulantesDto[] = ormPostulante.map(function (ormCustomer) {
      let postulanteDto = new GetPostulantesDto();
      postulanteDto.id = Number(ormCustomer.id);
      postulanteDto.first_name = ormCustomer.first_name;
      postulanteDto.last_name = ormCustomer.last_name;
      postulanteDto.dni = ormCustomer.dni;
      postulanteDto.createdAt = ormCustomer.created_at;
      postulanteDto.createdBy = ormCustomer.created_by;
      postulanteDto.updatedAt = ormCustomer.updated_at;
      postulanteDto.updatedBy = ormCustomer.updated_by;
      postulanteDto.state = ormCustomer.state;
      return postulanteDto;
    });
    return convocatorias;
  }
}