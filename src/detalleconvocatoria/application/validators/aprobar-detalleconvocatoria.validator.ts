import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { DetalleConvocatoriaTypeORM } from '../../infrastructure/persistence/typeorm/entities/detalleconvocatoria.typeorm';
import { RegisterDetalleConvocatoriaRequest } from '../dtos/request/register-detalleconvocatoria-request.dto';

@Injectable()
export class AprobarDetalleConvocatoriaValidator {
  constructor(
    @InjectRepository(DetalleConvocatoriaTypeORM)
    private convocatoriaRepository: Repository<DetalleConvocatoriaTypeORM>,
  ) {
  }

  public async validate(detalleConvocatoriaId: number): Promise<AppNotification> {
    
    let notification: AppNotification = new AppNotification();

    if (detalleConvocatoriaId <= 0) {
      notification.addError('detalleConvocatoriaId is required', null);
    }

    return notification;
  }
}