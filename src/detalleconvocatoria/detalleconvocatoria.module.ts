import { Module } from '@nestjs/common';
import { DetalleConvocatoriaController } from './api/detalleconvocatoria.controller';

import { CqrsModule } from '@nestjs/cqrs';

import { TypeOrmModule } from '@nestjs/typeorm';


//import { GetCustomersPersonHandler } from './application/handlers/queries/get-customers-person.handler';

import { DetalleConvocatoriaTypeORM } from './infrastructure/persistence/typeorm/entities/detalleconvocatoria.typeorm';

//import { GetCustomersCompanyHandler } from './application/handlers/queries/get-customers-company.handler';


import { DetalleConvocatoriaRegisteredHandler } from './application/handlers/events/detalleconvocatoria-registered.handler';

import { DetalleConvocatoriaAprobarHandler } from './application/handlers/events/detalleconvocatoria-aprobar.handler';


import { GetDetalleConvocatoriaHandler } from './application/handlers/queries/get-detalleconvocatoria.handler';


import { RegisterDetalleConvocatoriaHandler } from './application/handlers/commands/register-detalleconvocatoria.handler';
import { AprobarDetalleConvocatoriaHandler } from './application/handlers/commands/aprobar-detalleconvocatoria.handler';


import { DetalleConvocatoriaApplicationService } from './application/services/detalleconvocatoria-application.service';

import { RegisterDetalleConvocatoriaValidator } from './application/validators/register-detalleconvocatoria.validator';
import { AprobarDetalleConvocatoriaValidator } from './application/validators/aprobar-detalleconvocatoria.validator';


//import { DeleteConvocatoriaHandler } from './application/handlers/commands/delete-convocatoria.handler';

//import { ConvocatoriaRegisteredHandler } from './application/handlers/events/';
//import { PublicarConvocatoriaHandler } from './application/handlers/commands/publicar-convocatoria.handler';
export const CommandHandlers = [ RegisterDetalleConvocatoriaHandler, AprobarDetalleConvocatoriaHandler ];
export const EventHandlers = [ DetalleConvocatoriaRegisteredHandler, DetalleConvocatoriaAprobarHandler ];
export const QueryHandlers = [ GetDetalleConvocatoriaHandler ];
/* export const CommandHandlers = [ RegisterPostulanteHandler, DeleteConvocatoriaHandler, PublicarConvocatoriaHandler ];
export const EventHandlers = [ PostulanteRegisteredHandler ];
export const QueryHandlers = [ GetConvocatoriaHandler, GetConvocatoriaByIdHandler]; */

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([DetalleConvocatoriaTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [DetalleConvocatoriaController],
  providers: [
    DetalleConvocatoriaApplicationService,
    RegisterDetalleConvocatoriaValidator,
    AprobarDetalleConvocatoriaValidator,

    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class DetalleConvocatoriaModule {}