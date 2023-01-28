import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleConvocatoriaFactory } from '../../../domain/factories/detalleconvocatoria.factory';
import { ConvocatoriaId } from '../../../domain/value-objects/convocatoriaid.value';
import { PostulanteId } from '../../../domain/value-objects/postulanteid.value';
import { DetalleConvocatoriaId } from '../../../domain/value-objects/detalleconvocatoriaid.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';


import { DetalleConvocatoria } from '../../../domain/entities/detalleconvocatoria.entity';
import { DetalleConvocatoriaMapper } from '../../mappers/DetalleConvocatoria.mapper';
import { DetalleConvocatoriaTypeORM } from '../../../infrastructure/persistence/typeorm/entities/detalleconvocatoria.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';


import { RegisterDetalleConvocatoria } from '../../commands/register-detalleconvocatoria.command';


@CommandHandler(RegisterDetalleConvocatoria)
export class RegisterDetalleConvocatoriaHandler
  implements ICommandHandler<RegisterDetalleConvocatoria> {
  constructor(
    @InjectRepository(DetalleConvocatoriaTypeORM)
    private personRepository: Repository<DetalleConvocatoriaTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterDetalleConvocatoria) {
    let detalleConvocatoriaId: number = 0;
    const convocatoriaIdResult: Result<AppNotification, ConvocatoriaId> = ConvocatoriaId.create(command.convocatoriaId);
    if (convocatoriaIdResult.isFailure()) {
      return detalleConvocatoriaId;
    }

    const postulanteIdResult: Result<AppNotification, PostulanteId> = PostulanteId.create(command.postulanteId);
    if (postulanteIdResult.isFailure()) {
      return detalleConvocatoriaId;
    }

    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );


    let person: DetalleConvocatoria = DetalleConvocatoriaFactory.createFrom(convocatoriaIdResult.value, postulanteIdResult.value, auditTrail);
    let personTypeORM: DetalleConvocatoriaTypeORM = DetalleConvocatoriaMapper.toTypeORM(person);
    personTypeORM = await this.personRepository.save(personTypeORM);
    if (personTypeORM == null) {
      return detalleConvocatoriaId;
    }
    detalleConvocatoriaId = Number(personTypeORM.id);
    person.changeId(DetalleConvocatoriaId.of(detalleConvocatoriaId));
    person = this.publisher.mergeObjectContext(person);
    person.register();
    person.commit();
    return detalleConvocatoriaId;
  }
}