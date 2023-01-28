import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { ConvocatoriaTypeORM } from '../../infrastructure/persistence/typeorm/entities/convocatoria.typeorm';
import { EditConvocatoriaRequest } from '../dtos/request/edit-convocatoria-request.dto';

@Injectable()
export class PublicarConvocatoriaValidator {
  constructor(
    @InjectRepository(ConvocatoriaTypeORM)
    private convocatoriaRepository: Repository<ConvocatoriaTypeORM>,
  ) {
  }

  public async validate(
    editConvocatoriaRequest: EditConvocatoriaRequest,
  ): Promise<AppNotification> {
    
    let notification: AppNotification = new AppNotification();
  
    const updatedBy: number = editConvocatoriaRequest.updatedBy;
    if (updatedBy == 0) {
      notification.addError('updatedBy is required', null);
    }
    
    return notification;
  }
}