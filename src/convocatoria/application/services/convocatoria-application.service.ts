import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterConvocatoriaResponse } from '../dtos/response/register-convocatoria.response.dto';
import { RegisterConvocatoriaValidator } from '../validators/register-convocatoria.validator';
import { DeleteConvocatoriaValidator } from '../validators/delete-convocatoria.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterPerson } from '../commands/register-person.command';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';
import { RegisterConvocatoriaRequest } from '../dtos/request/register-convocatoria-request.dto';
import { RegisterConvocatoria } from '../commands/register-convocatoria.command';

import { EditConvocatoriaRequest } from '../dtos/request/edit-convocatoria-request.dto';

import { EliminarConvocatoria } from '../commands/eliminar-convocatoria.command';
import { EditConvocatoriaResponse } from '../dtos/response/edit-convocatoria.response.dto';

import { ConvocatoriaTypeORM } from '../../infrastructure/persistence/typeorm/entities/convocatoria.typeorm';
import { ConvocatoriaType } from '../../domain/enums/convocatoria-type.enum';

import { PublicarConvocatoriaValidator } from '../validators/publicar-convocatoria.validator';
import { PublicarConvocatoria } from '../commands/publicar-convocatoria.command';

import { UpdateResult }  from 'typeorm'

@Injectable()
export class ConvocatoriaApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerConvocatoriaValidator: RegisterConvocatoriaValidator,
    private deleteConvocatoriaValidator: DeleteConvocatoriaValidator,
    private publicarConvocatoriaValidator: PublicarConvocatoriaValidator,
  ) {}


  async publicar(
    convocatoriaId: number,
    editConvocatoriaRequest: EditConvocatoriaRequest,
  ): Promise<Result<AppNotification, EditConvocatoriaResponse>> {
    const notification: AppNotification = await this.publicarConvocatoriaValidator.validate(editConvocatoriaRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const updatedAt = DateTime.utcNow().format();
    const updatedBy = editConvocatoriaRequest.updatedBy;
    const publicarConvocatoria: PublicarConvocatoria = new PublicarConvocatoria(
      convocatoriaId,
        updatedAt,
        updatedBy
    );

    const convocatoria: ConvocatoriaTypeORM = await this.commandBus.execute(publicarConvocatoria);
    var editResponse: EditConvocatoriaResponse;
    if(convocatoria != null){
      editResponse = new EditConvocatoriaResponse(
        convocatoria.id,
        convocatoria.convocatoriaName.value,
        0,
        '',
        updatedBy,
        updatedAt,
        ConvocatoriaType.PUBLICADO
        );
    }
    
    return Result.ok(editResponse);
  }

  async eliminar(
    convocatoriaId: number,
    editConvocatoriaRequest: EditConvocatoriaRequest,
  ): Promise<Result<AppNotification, EditConvocatoriaResponse>> {
    const notification: AppNotification = await this.deleteConvocatoriaValidator.validate(editConvocatoriaRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const updatedAt = DateTime.utcNow().format();
    const updatedBy = editConvocatoriaRequest.updatedBy;
    const eliminarConvocatoria: EliminarConvocatoria = new EliminarConvocatoria(
      convocatoriaId,
        updatedAt,
        updatedBy
    );
    const convocatoria: ConvocatoriaTypeORM = await this.commandBus.execute(eliminarConvocatoria);
    var editResponse: EditConvocatoriaResponse;
    if(convocatoria != null){
      editResponse = new EditConvocatoriaResponse(
        convocatoria.id,
        convocatoria.convocatoriaName.value,
        0,
        '',
        updatedBy,
        updatedAt,
        ConvocatoriaType.ELIMINADO
        );
    }
    
    return Result.ok(editResponse);
  }

  async register(
    registerConvocatoriaRequest: RegisterConvocatoriaRequest,
  ): Promise<Result<AppNotification, RegisterConvocatoriaResponse>> {
    const notification: AppNotification = await this.registerConvocatoriaValidator.validate(registerConvocatoriaRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const name = registerConvocatoriaRequest.convocatoriaName;
    const createdAt = DateTime.utcNow().format();
    const createdBy = registerConvocatoriaRequest.createdBy;
    const updatedAt = null;
    const updatedBy = null;
    const registerConvocatoria: RegisterConvocatoria = new RegisterConvocatoria(
        name,
        createdAt,
        createdBy,
        null,
        null
    );
    const customerId: number = await this.commandBus.execute(registerConvocatoria);
    const registerResponse: RegisterConvocatoriaResponse = new RegisterConvocatoriaResponse(
      customerId,
      registerConvocatoriaRequest.convocatoriaName,
      registerConvocatoriaRequest.createdBy,
    );
    return Result.ok(registerResponse);
  }
}