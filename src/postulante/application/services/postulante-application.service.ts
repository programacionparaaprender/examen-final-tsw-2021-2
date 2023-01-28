import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterConvocatoriaResponse } from '../dtos/response/register-convocatoria.response.dto';
import { RegisterPostulanteValidator } from '../validators/register-postulante.validator';

import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterPostulante } from '../commands/register-postulante.command';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';
import { RegisterPostulanteRequest } from '../dtos/request/register-postulante-request.dto';
import { RegisterConvocatoria } from '../commands/register-convocatoria.command';


import { RegisterPostulanteResponse } from '../dtos/response/register-postulante-response.dto';

import { PostulanteType } from '../../domain/enums/postulante-type.enum';
import { UpdateResult }  from 'typeorm'

@Injectable()
export class PostulanteApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPostulanteValidator: RegisterPostulanteValidator,

  ) {}



  async register(
    registerPostulanteRequest: RegisterPostulanteRequest,
  ): Promise<Result<AppNotification, RegisterPostulanteResponse>> {
    const notification: AppNotification = await this.registerPostulanteValidator.validate(registerPostulanteRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = registerPostulanteRequest.createdBy;
    const updatedAt = null;
    const updatedBy = null;
    const registerPerson: RegisterPostulante = new RegisterPostulante(
      registerPostulanteRequest.firstName,
      registerPostulanteRequest.lastName,
      registerPostulanteRequest.dni,
      PostulanteType.CREADO,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );
    const customerId: number = await this.commandBus.execute(registerPerson);
    const registerResponse: RegisterPostulanteResponse = new RegisterPostulanteResponse(
      customerId,
      registerPostulanteRequest.firstName,
      registerPostulanteRequest.lastName,
      registerPostulanteRequest.dni,
    );
    return Result.ok(registerResponse);
  }
}