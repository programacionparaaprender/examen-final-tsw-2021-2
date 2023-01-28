import { Module } from '@nestjs/common';
import { PostulanteController } from './api/postulante.controller';

import { CqrsModule } from '@nestjs/cqrs';

import { TypeOrmModule } from '@nestjs/typeorm';


import { GetCustomersPersonHandler } from './application/handlers/queries/get-customers-person.handler';

import { PostulanteTypeORM } from './infrastructure/persistence/typeorm/entities/postulante.typeorm';

import { GetCustomersCompanyHandler } from './application/handlers/queries/get-customers-company.handler';


import { PostulanteRegisteredHandler } from './application/handlers/events/postulante-registered.handler';

import { GetPostulantesHandler } from './application/handlers/queries/get-postulantes.handler';
import { GetPostulanteByIdHandler } from './application/handlers/queries/get-postulante-id.handler';

import { RegisterPostulanteHandler } from './application/handlers/commands/register-postulante.handler';

import { PostulanteApplicationService } from './application/services/postulante-application.service';

import { RegisterPostulanteValidator } from './application/validators/register-postulante.validator';

//import { DeleteConvocatoriaHandler } from './application/handlers/commands/delete-convocatoria.handler';

//import { ConvocatoriaRegisteredHandler } from './application/handlers/events/';
//import { PublicarConvocatoriaHandler } from './application/handlers/commands/publicar-convocatoria.handler';
export const CommandHandlers = [ RegisterPostulanteHandler ];
export const EventHandlers = [ PostulanteRegisteredHandler ];
export const QueryHandlers = [ GetPostulantesHandler, GetPostulanteByIdHandler ];
/* export const CommandHandlers = [ RegisterPostulanteHandler, DeleteConvocatoriaHandler, PublicarConvocatoriaHandler ];
export const EventHandlers = [ PostulanteRegisteredHandler ];
export const QueryHandlers = [ GetConvocatoriaHandler, GetConvocatoriaByIdHandler]; */

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PostulanteTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [PostulanteController],
  providers: [
    PostulanteApplicationService,
    RegisterPostulanteValidator,

    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class PostulanteModule {}