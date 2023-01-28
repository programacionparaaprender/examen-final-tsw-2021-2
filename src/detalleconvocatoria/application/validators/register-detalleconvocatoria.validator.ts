import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { DetalleConvocatoriaTypeORM } from '../../infrastructure/persistence/typeorm/entities/detalleconvocatoria.typeorm';
import { RegisterDetalleConvocatoriaRequest } from '../dtos/request/register-detalleconvocatoria-request.dto';

@Injectable()
export class RegisterDetalleConvocatoriaValidator {
  constructor(
    @InjectRepository(DetalleConvocatoriaTypeORM)
    private convocatoriaRepository: Repository<DetalleConvocatoriaTypeORM>,
  ) {
  }

  public async validate(
    registerConvocatoriaRequest: RegisterDetalleConvocatoriaRequest,
  ): Promise<AppNotification> {
    
    let notification: AppNotification = new AppNotification();
    
    const postulanteId: number = registerConvocatoriaRequest.postulanteId;
    
    if (postulanteId <= 0) {
      notification.addError('postulanteId is required', null);
    }

    const convocatoriaId: number = registerConvocatoriaRequest.convocatoriaId;
    
    if (convocatoriaId <= 0) {
      notification.addError('convocatoriaId is required', null);
    }

    const createdBy: number = registerConvocatoriaRequest.createdBy;
    if (createdBy == 0) {
      notification.addError('createdBy is required', null);
    }
    
    return notification;
  }
}