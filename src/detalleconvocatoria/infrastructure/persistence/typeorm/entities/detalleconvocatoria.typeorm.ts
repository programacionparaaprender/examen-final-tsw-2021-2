import { Column, Entity, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

import { StateTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/State.typeorm';
import { CalificacionTypeORM } from '../value-objects/calificacion.typeorm';
import { ConvocatoriaIdTypeORM } from '../value-objects/convocatoriaid.typeorm';
import { PostulanteIdTypeORM } from '../value-objects/postulanteid.typeorm';

@Entity('detalle_convocatoria')
export class DetalleConvocatoriaTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => ConvocatoriaIdTypeORM, { prefix: false })
  public convocatoriaId: ConvocatoriaIdTypeORM;

  @Column((type) => PostulanteIdTypeORM, { prefix: false })
  public postulanteId: PostulanteIdTypeORM;

  @Column((type) => CalificacionTypeORM, { prefix: false })
  public calificacion: CalificacionTypeORM;

  @Column((type) => StateTypeorm, { prefix: false })
  public state: StateTypeorm;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;

}