import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
//import { GetCustomersPersonQuery } from '../application/queries/get-customers-person.query';


import { DetalleConvocatoriaApplicationService } from '../application/services/detalleconvocatoria-application.service';


//import { RegisterCompanyRequest } from '../application/dtos/request/register-company-request.dto';
//import { RegisterCompanyResponse } from '../application/dtos/response/register-company-response.dto';
//import { GetCustomersCompanyQuery } from '../application/queries/get-customers-company.query';

//import { GetConvocatoriaQuery } from '../application/queries/get-convocatoria.query';
//import { GetPostulanteIdQuery } from '../application/queries/get-postulanteid.query';
//import { GetConvocatoriaChangeQuery } from '../application/queries/get-convocatoria-change.query';

import { RegisterDetalleConvocatoriaRequest } from '../application/dtos/request/register-detalleconvocatoria-request.dto';
import { RegisterDetalleConvocatoriaResponse } from '../application/dtos/response/register-detalleconvocatoria-response.dto';
import { EditDetalleConvocatoriaRequest } from '../application/dtos/request/edit-detalleconvocatoria-request.dto';
import { EditDetalleConvocatoriaResponse } from '../application/dtos/response/edit-detalleconvocatoria-response.dto';


import { Controller, Post, Body, Res, Get, Param, Patch } from '@nestjs/common';
import { Repository, Transaction, TransactionRepository } from 'typeorm';


import { GetDetalleConvocatoriaQuery } from '../application/queries/get-detalleconvocatoria.query';


@Controller('detalleconvocatoria')
export class DetalleConvocatoriaController {
  constructor(
    private readonly postulanteApplicationService: DetalleConvocatoriaApplicationService,
    private readonly queryBus: QueryBus
  ) {}



  @Get('/:id')
  async getDetalleConvocatorias(@Param('id') convocatoriaId: number,@Res({ passthrough: true }) response): Promise<object> {
    try {
      const postulantes = await this.queryBus.execute(new GetDetalleConvocatoriaQuery(convocatoriaId, 0));
      return ApiController.ok(response, postulantes);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('/')
  async registrarDetalleConvocatoria(
    @Body() registerDetalleConvocatoriaRequest: RegisterDetalleConvocatoriaRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterDetalleConvocatoriaResponse> = await this.postulanteApplicationService.register(registerDetalleConvocatoriaRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Patch(':id/aprobar')
  async aprobar(
    @Param('id') detalleConvocatoriaId: number, 
    @Body() editConvocatoriaRequest: EditDetalleConvocatoriaRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, EditDetalleConvocatoriaResponse> = await this.postulanteApplicationService.aprobar(detalleConvocatoriaId, editConvocatoriaRequest);
      
      if (result.isSuccess()) {
        const postulantes = await this.queryBus.execute(new GetDetalleConvocatoriaQuery(editConvocatoriaRequest.convocatoriaId, 0));
        return ApiController.ok(response, postulantes);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

}