
import { RegisterPersonRequest } from '../application/dtos/request/register-person-request.dto';
import { RegisterPersonResponse } from '../application/dtos/response/register-person-response.dto';
import { CompanyApplicationService } from '../application/services/company-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetCustomersPersonQuery } from '../application/queries/get-customers-person.query';
import { PersonApplicationService } from '../application/services/person-application.service';
import { ConvocatoriaApplicationService } from '../application/services/convocatoria-application.service';
import { RegisterCompanyRequest } from '../application/dtos/request/register-company-request.dto';
import { RegisterCompanyResponse } from '../application/dtos/response/register-company-response.dto';
import { GetCustomersCompanyQuery } from '../application/queries/get-customers-company.query';

import { GetConvocatoriaQuery } from '../application/queries/get-convocatoria.query';
import { GetConvocatoriaIdQuery } from '../application/queries/get-convocatoriaid.query';
import { GetConvocatoriaChangeQuery } from '../application/queries/get-convocatoria-change.query';

import { RegisterConvocatoriaRequest } from '../application/dtos/request/register-convocatoria-request.dto';
import { RegisterConvocatoriaResponse } from '../application/dtos/response/register-convocatoria.response.dto';
import { EditConvocatoriaRequest } from '../application/dtos/request/edit-convocatoria-request.dto';
import { EditConvocatoriaResponse } from '../application/dtos/response/edit-convocatoria.response.dto';


import { Controller, Post, Body, Res, Get, Param, Patch } from '@nestjs/common';
import { Repository, Transaction, TransactionRepository } from 'typeorm';


@Controller('convocatoria')
export class ConvocatoriaController {
  constructor(
    private readonly convocatoriaApplicationService: ConvocatoriaApplicationService,
    private readonly queryBus: QueryBus
  ) {}


  @Patch(':id/publicar')
  async publicar(
    @Param('id') convocatoriaId: number, 
    @Body() editConvocatoriaRequest: EditConvocatoriaRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, EditConvocatoriaResponse> = await this.convocatoriaApplicationService.publicar(convocatoriaId, editConvocatoriaRequest);
      
      if (result.isSuccess()) {
          //return ApiController.created(response, result.value);
          const convocatoria = await this.queryBus.execute(new GetConvocatoriaIdQuery(convocatoriaId));
          return ApiController.ok(response, convocatoria);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }


  @Patch(':id/eliminar')
  async eliminar(
    @Param('id') convocatoriaId: number, 
    @Body() editConvocatoriaRequest: EditConvocatoriaRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, EditConvocatoriaResponse> = await this.convocatoriaApplicationService.eliminar(convocatoriaId, editConvocatoriaRequest);
      
      if (result.isSuccess()) {
          //return ApiController.created(response, result.value);
          const convocatoria = await this.queryBus.execute(new GetConvocatoriaIdQuery(convocatoriaId));
          return ApiController.ok(response, convocatoria);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getConvocatoriaPorId(@Param('id') convocatoriaId: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const convocatoria = await this.queryBus.execute(new GetConvocatoriaIdQuery(convocatoriaId));
      return ApiController.ok(response, convocatoria);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/')
  async getConvocatorias(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const convocatorias = await this.queryBus.execute(new GetConvocatoriaQuery());
      return ApiController.ok(response, convocatorias);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('/registrarConvocatoria')
  async registrarConvocatoria(
    @Body() registerConvocatoriaRequest: RegisterConvocatoriaRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterConvocatoriaResponse> = await this.convocatoriaApplicationService.register(registerConvocatoriaRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

}