import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConvocatoriaFactory } from '../../../domain/factories/convocatoria.factory';
import { ConvocatoriaId } from '../../../domain/value-objects/convocatoria-id.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { ConvocatoriaName } from '../../../../common/domain/value-objects/convocatoria-name.value';

import { Convocatoria } from '../../../domain/entities/convocatoria.entity';
import { ConvocatoriaMapper } from '../../mappers/convocatoria.mapper';
import { ConvocatoriaTypeORM } from '../../../infrastructure/persistence/typeorm/entities/convocatoria.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';


import { RegisterConvocatoria } from '../../commands/register-convocatoria.command';


@CommandHandler(RegisterConvocatoria)
export class RegisterConvocatoriaHandler
  implements ICommandHandler<RegisterConvocatoria> {
  constructor(
    @InjectRepository(ConvocatoriaTypeORM)
    private personRepository: Repository<ConvocatoriaTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterConvocatoria) {
    let convocatoriaId: number = 0;
    const personNameResult: Result<AppNotification, ConvocatoriaName> = ConvocatoriaName.create(command.convocatoriaName);
    if (personNameResult.isFailure()) {
      return convocatoriaId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );


    let person: Convocatoria = ConvocatoriaFactory.createFrom(personNameResult.value, auditTrail);
    let personTypeORM: ConvocatoriaTypeORM = ConvocatoriaMapper.toTypeORM(person);
    personTypeORM = await this.personRepository.save(personTypeORM);
    if (personTypeORM == null) {
      return convocatoriaId;
    }
    convocatoriaId = Number(personTypeORM.id);
    person.changeId(ConvocatoriaId.of(convocatoriaId));
    person = this.publisher.mergeObjectContext(person);
    person.register();
    person.commit();
    return convocatoriaId;
  }
}