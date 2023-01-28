import { Column, Entity, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { CustomerType } from '../../../../domain/enums/customer-type.enum';
import { ConvocatoriaNameTypeORM } from '../value-objects/convocatoria-name.typeorm';
import { StateTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/State.typeorm';
import { ConvocatoriaUpdatedByTypeorm } from '../value-objects/convocatoria-updatedby.typeorm';
import { ConvocatoriaUpdatedAtTypeORM } from '../value-objects/convocatoria-updatedat.typeorm';

@Entity('convocatorias')
export class ConvocatoriaTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => ConvocatoriaNameTypeORM, { prefix: false })
  public convocatoriaName: ConvocatoriaNameTypeORM;

  @Column((type) => StateTypeorm, { prefix: false })
  public state: StateTypeorm;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;

}