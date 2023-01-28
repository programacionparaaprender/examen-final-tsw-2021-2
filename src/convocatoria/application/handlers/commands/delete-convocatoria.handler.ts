import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConvocatoriaTypeORM } from '../../../infrastructure/persistence/typeorm/entities/convocatoria.typeorm';
import { ConvocatoriaType } from '../../../domain/enums/convocatoria-type.enum';
import { EliminarConvocatoria } from '../../commands/eliminar-convocatoria.command';
import { StateTypeorm } from '../../../../common/infrastructure/persistence/typeorm/value-objects/State.typeorm';
import { ConvocatoriaUpdatedByTypeorm } from '../../../infrastructure/persistence/typeorm/value-objects/convocatoria-updatedby.typeorm';
import { ConvocatoriaUpdatedAtTypeORM } from '../../../infrastructure/persistence/typeorm/value-objects/convocatoria-updatedat.typeorm';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';
import { AuditTrailTypeORM } from '../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';



@CommandHandler(EliminarConvocatoria)
export class DeleteConvocatoriaHandler
  implements ICommandHandler<EliminarConvocatoria> {
  constructor(
    @InjectRepository(ConvocatoriaTypeORM)
    private convocatoriaRepository: Repository<ConvocatoriaTypeORM>
  ) {
  }

  async execute(command: EliminarConvocatoria) {
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
    //convocatoriaTypeORM.state = ConvocatoriaStateTypeorm.from(ConvocatoriaType.ELIMINADO);
    //convocatoriaTypeORM.updatedBy = ConvocatoriaUpdatedByTypeorm.from(command.updatedBy);
    //convocatoriaTypeORM.updatedAt = ConvocatoriaUpdatedAtTypeORM.from(command.updatedAt);
    //var update: Promise<UpdateResult>;
    //update = 
    await this.convocatoriaRepository.update({
      id: command.id,
    }, {
      state: StateTypeorm.from(ConvocatoriaType.ELIMINADO),
      auditTrail: auditTrail
    });
    if (convocatoriaTypeORM == null) {
      return null;
    }
    return convocatoriaTypeORM;
  }
}