import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConvocatoriaTypeORM } from '../../../infrastructure/persistence/typeorm/entities/convocatoria.typeorm';
import { ConvocatoriaType } from '../../../domain/enums/convocatoria-type.enum';
import { PublicarConvocatoria } from '../../commands/publicar-convocatoria.command';
import { StateTypeorm } from '../../../../common/infrastructure/persistence/typeorm/value-objects/State.typeorm';
import { ConvocatoriaUpdatedByTypeorm } from '../../../infrastructure/persistence/typeorm/value-objects/convocatoria-updatedby.typeorm';
import { ConvocatoriaUpdatedAtTypeORM } from '../../../infrastructure/persistence/typeorm/value-objects/convocatoria-updatedat.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UpdateResult }  from 'typeorm'
import { UserId } from '../../../../users/domain/value-objects/user-id.value';
import { AuditTrailTypeORM } from '../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';


@CommandHandler(PublicarConvocatoria)
export class PublicarConvocatoriaHandler
  implements ICommandHandler<PublicarConvocatoria> {
  constructor(
    @InjectRepository(ConvocatoriaTypeORM)
    private convocatoriaRepository: Repository<ConvocatoriaTypeORM>
  ) {
  }

  async execute(command: PublicarConvocatoria) {
    const convocatoriaId: number = command.id;
    let convocatoriaTypeORM: ConvocatoriaTypeORM = await this.convocatoriaRepository
      .createQueryBuilder()
      .where("id = :id")
      .setParameter("id", convocatoriaId)
      .getOne();
    if (convocatoriaTypeORM == null) {
      return false;
    }
    const auditTrail: AuditTrailTypeORM = AuditTrailTypeORM.from(
      convocatoriaTypeORM.auditTrail.createdAt,
      convocatoriaTypeORM.auditTrail.createdBy,
      command.updatedAt,
      command.updatedBy
    );
    //var update: Promise<UpdateResult> = 
    await this.convocatoriaRepository.update({
      id: command.id,
    }, {
      state: StateTypeorm.from(ConvocatoriaType.PUBLICADO),
      auditTrail: auditTrail
    });
    return convocatoriaTypeORM;
  }
}