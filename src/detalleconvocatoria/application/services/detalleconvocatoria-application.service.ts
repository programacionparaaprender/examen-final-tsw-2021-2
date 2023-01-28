import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterDetalleConvocatoriaValidator } from '../validators/register-detalleconvocatoria.validator';

import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';
import { RegisterDetalleConvocatoriaRequest } from '../dtos/request/register-detalleconvocatoria-request.dto';
import { RegisterDetalleConvocatoria } from '../commands/register-detalleconvocatoria.command';

import { EditDetalleConvocatoriaRequest } from '../dtos/request/edit-detalleconvocatoria-request.dto';
import { EditDetalleConvocatoriaResponse } from '../dtos/response/edit-detalleconvocatoria-response.dto';
import { RegisterDetalleConvocatoriaResponse } from '../dtos/response/register-detalleconvocatoria-response.dto';

import { DetalleConvocatoriaType } from '../../domain/enums/detalleconvocatoria-type.enum';
import { UpdateResult }  from 'typeorm'


import { AprobarDetalleConvocatoriaValidator } from '../validators/aprobar-detalleconvocatoria.validator';

import { DetalleConvocatoriaTypeORM } from '../../infrastructure/persistence/typeorm/entities/detalleconvocatoria.typeorm';


import { AprobarDetalleConvocatoria } from '../commands/aprobar-detalleconvocatoria.command';

@Injectable()
export class DetalleConvocatoriaApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerDetalleConvocatoriaValidator: RegisterDetalleConvocatoriaValidator,
    private aprobarDetalleConvocatoriaValidator: AprobarDetalleConvocatoriaValidator,

  ) {}



  async register(
    registerPostulanteRequest: RegisterDetalleConvocatoriaRequest,
  ): Promise<Result<AppNotification, RegisterDetalleConvocatoriaResponse>> {
    const notification: AppNotification = await this.registerDetalleConvocatoriaValidator.validate(registerPostulanteRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = registerPostulanteRequest.createdBy;
    const updatedAt = null;
    const updatedBy = null;
    const registerPerson: RegisterDetalleConvocatoria = new RegisterDetalleConvocatoria(
      registerPostulanteRequest.convocatoriaId,
      registerPostulanteRequest.postulanteId,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );
    const detalleConvocatoriaId: number = await this.commandBus.execute(registerPerson);
    const registerResponse: RegisterDetalleConvocatoriaResponse = new RegisterDetalleConvocatoriaResponse(
      detalleConvocatoriaId,
      registerPostulanteRequest.postulanteId,
      registerPostulanteRequest.convocatoriaId,
      registerPostulanteRequest.createdBy,
      createdAt
    );
    return Result.ok(registerResponse);
  }

  async aprobar(
    detalleConvocatoriaId: number,
    editConvocatoriaRequest: EditDetalleConvocatoriaRequest,
    ): Promise<Result<AppNotification, EditDetalleConvocatoriaResponse>> {
    const notification: AppNotification = await this.aprobarDetalleConvocatoriaValidator.validate(detalleConvocatoriaId);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const updatedAt = DateTime.utcNow().format();
    const updatedBy = editConvocatoriaRequest.updatedBy;
    const publicarConvocatoria: AprobarDetalleConvocatoria = new AprobarDetalleConvocatoria(
      detalleConvocatoriaId,
        updatedAt,
        updatedBy
    );

    const convocatoria: DetalleConvocatoriaTypeORM = await this.commandBus.execute(publicarConvocatoria);
    var editResponse: EditDetalleConvocatoriaResponse;
    if(convocatoria != null){
      editResponse = new EditDetalleConvocatoriaResponse(
        convocatoria.id,
        convocatoria.postulanteId.value,
        convocatoria.convocatoriaId.value,
        0,
        '',
        updatedBy,
        updatedAt,
        DetalleConvocatoriaType.APROBADO
        );
    }
    
    return Result.ok(editResponse);
  }
}