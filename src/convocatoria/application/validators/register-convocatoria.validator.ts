import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { ConvocatoriaTypeORM } from '../../infrastructure/persistence/typeorm/entities/convocatoria.typeorm';
import { RegisterConvocatoriaRequest } from '../dtos/request/register-convocatoria-request.dto';

@Injectable()
export class RegisterConvocatoriaValidator {
  constructor(
    @InjectRepository(ConvocatoriaTypeORM)
    private convocatoriaRepository: Repository<ConvocatoriaTypeORM>,
  ) {
  }

  public async validate(
    registerConvocatoriaRequest: RegisterConvocatoriaRequest,
  ): Promise<AppNotification> {
    
    let notification: AppNotification = new AppNotification();
    
    const name: string = registerConvocatoriaRequest.convocatoriaName.trim();
    
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }

    const createdBy: number = registerConvocatoriaRequest.createdBy;
    if (createdBy == 0) {
      notification.addError('createdBy is required', null);
    }
    
    return notification;
  }
}