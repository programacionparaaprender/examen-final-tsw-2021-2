import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { PostulanteTypeORM } from '../../infrastructure/persistence/typeorm/entities/postulante.typeorm';
import { RegisterPostulanteRequest } from '../dtos/request/register-postulante-request.dto';

@Injectable()
export class RegisterPostulanteValidator {
  constructor(
    @InjectRepository(PostulanteTypeORM)
    private postulanteRepository: Repository<PostulanteTypeORM>,
  ) {
  }

  public async validate(
    registerPersonRequest: RegisterPostulanteRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerPersonRequest.firstName ? registerPersonRequest.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerPersonRequest.lastName ? registerPersonRequest.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerPersonRequest.dni ? registerPersonRequest.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const customer: PostulanteTypeORM = await this.postulanteRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    if (customer != null) {
      notification.addError('dni is taken', null);
    }
    return notification;
  }
}