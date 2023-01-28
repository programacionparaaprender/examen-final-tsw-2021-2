import { Column, Entity, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { CustomerType } from '../../../../domain/enums/customer-type.enum';
import { DniTypeORM } from '../value-objects/dni.typeorm';
import { PersonNameTypeORM } from '../value-objects/person-name.typeorm';
import { StateTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/State.typeorm';


@Entity('postulantes')
export class PostulanteTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => PersonNameTypeORM, { prefix: false })
  public name: PersonNameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;
  
  @Column((type) => StateTypeorm, { prefix: false })
  public state: StateTypeorm;
  
  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;



 
}