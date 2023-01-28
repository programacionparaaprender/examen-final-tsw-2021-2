
import { RegisterPersonRequest } from '../application/dtos/request/register-person-request.dto';
import { RegisterPersonResponse } from '../application/dtos/response/register-person-response.dto';

import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetCustomersPersonQuery } from '../application/queries/get-customers-person.query';


import { PostulanteApplicationService } from '../application/services/postulante-application.service';


import { RegisterCompanyRequest } from '../application/dtos/request/register-company-request.dto';
import { RegisterCompanyResponse } from '../application/dtos/response/register-company-response.dto';
import { GetCustomersCompanyQuery } from '../application/queries/get-customers-company.query';

import { GetConvocatoriaQuery } from '../application/queries/get-convocatoria.query';
import { GetPostulanteIdQuery } from '../application/queries/get-postulanteid.query';
import { GetConvocatoriaChangeQuery } from '../application/queries/get-convocatoria-change.query';

import { RegisterPostulanteRequest } from '../application/dtos/request/register-postulante-request.dto';
import { RegisterPostulanteResponse } from '../application/dtos/response/register-postulante-response.dto';
import { EditConvocatoriaRequest } from '../application/dtos/request/edit-convocatoria-request.dto';
import { EditConvocatoriaResponse } from '../application/dtos/response/edit-convocatoria.response.dto';


import { Controller, Post, Body, Res, Get, Param, Patch } from '@nestjs/common';
import { Repository, Transaction, TransactionRepository } from 'typeorm';


import { GetPostulantesQuery } from '../application/queries/get-postulantes.query';


@Controller('postulante')
export class PostulanteController {
  constructor(
    private readonly postulanteApplicationService: PostulanteApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Get('/:id')
  async getPostulantePorId(@Param('id') postulanteId: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const postulante = await this.queryBus.execute(new GetPostulanteIdQuery(postulanteId));
      return ApiController.ok(response, postulante);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/')
  async getPostulantes(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const postulantes = await this.queryBus.execute(new GetPostulantesQuery());
      return ApiController.ok(response, postulantes);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('/')
  async registrarPostulante(
    @Body() registerPostulanteRequest: RegisterPostulanteRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPostulanteResponse> = await this.postulanteApplicationService.register(registerPostulanteRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

}