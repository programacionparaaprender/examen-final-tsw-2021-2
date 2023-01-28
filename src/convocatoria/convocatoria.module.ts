import { Module } from '@nestjs/common';
import { ConvocatoriaController } from './api/convocatoria.controller';
import { CompanyApplicationService } from './application/services/company-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterPersonValidator } from './application/validators/register-person.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterCompanyHandler } from './application/handlers/commands/register-company.handler';

import { GetCustomersPersonHandler } from './application/handlers/queries/get-customers-person.handler';
import { PersonApplicationService } from './application/services/person-application.service';
import { RegisterCompanyValidator } from './application/validators/register-company.validator';
import { RegisterPersonHandler } from './application/handlers/commands/register-person.handler';
import { CompanyTypeORM } from './infrastructure/persistence/typeorm/entities/company.typeorm';
import { PersonTypeORM } from './infrastructure/persistence/typeorm/entities/person.typeorm';
import { ConvocatoriaTypeORM } from './infrastructure/persistence/typeorm/entities/convocatoria.typeorm';
import { CompanyRegisteredHandler } from './application/handlers/events/company-registered.handler';
import { GetCustomersCompanyHandler } from './application/handlers/queries/get-customers-company.handler';
import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';

import { PersonRegisteredHandler } from './application/handlers/events/person-registered.handler';

import { GetConvocatoriaHandler } from './application/handlers/queries/get-convocatoria.handler';
import { GetConvocatoriaByIdHandler } from './application/handlers/queries/get-convocatoria-id.handler';
import { ConvocatoriaRegisteredHandler } from './application/handlers/events/convocatoria-registered.handler';
import { RegisterConvocatoriaHandler } from './application/handlers/commands/register-convocatoria.handler';
import { ConvocatoriaApplicationService } from './application/services/convocatoria-application.service';
import { RegisterConvocatoriaValidator } from './application/validators/register-convocatoria.validator';

import { DeleteConvocatoriaHandler } from './application/handlers/commands/delete-convocatoria.handler';
import { DeleteConvocatoriaValidator } from './application/validators/delete-convocatoria.validator';
import { PublicarConvocatoriaValidator } from './application/validators/publicar-convocatoria.validator';
//import { ConvocatoriaRegisteredHandler } from './application/handlers/events/';
import { PublicarConvocatoriaHandler } from './application/handlers/commands/publicar-convocatoria.handler';

export const CommandHandlers = [ RegisterConvocatoriaHandler, DeleteConvocatoriaHandler, PublicarConvocatoriaHandler ];
export const EventHandlers = [ ConvocatoriaRegisteredHandler ];
export const QueryHandlers = [ GetConvocatoriaHandler, GetConvocatoriaByIdHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ConvocatoriaTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [ConvocatoriaController],
  providers: [
    ConvocatoriaApplicationService,
    RegisterConvocatoriaValidator,
    DeleteConvocatoriaValidator,
    PublicarConvocatoriaValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ConvocatoriaModule {}