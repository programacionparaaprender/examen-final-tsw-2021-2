import { RucTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/ruc.typeorm';
import { Convocatoria } from '../../domain/entities/convocatoria.entity';
import { ConvocatoriaTypeORM } from '../../infrastructure/persistence/typeorm/entities/convocatoria.typeorm';
import { ConvocatoriaNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/convocatoria-name.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class ConvocatoriaMapper {
  public static toTypeORM(convocatoria: Convocatoria): ConvocatoriaTypeORM {
    const convocatoriaTypeORM: ConvocatoriaTypeORM = new ConvocatoriaTypeORM();
    convocatoriaTypeORM.convocatoriaName = ConvocatoriaNameTypeORM.from(convocatoria.getName().getValue());
    const createdAt: string = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getCreatedAt() != null ? convocatoria.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getCreatedBy() != null ? convocatoria.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getUpdatedAt() != null ? convocatoria.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getUpdatedBy() != null ? convocatoria.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    convocatoriaTypeORM.auditTrail = auditTrailTypeORM;
    return convocatoriaTypeORM;
  }
}