import { DetalleConvocatoria } from '../../domain/entities/detalleconvocatoria.entity';
import { DetalleConvocatoriaTypeORM } from '../../infrastructure/persistence/typeorm/entities/detalleconvocatoria.typeorm';
import { ConvocatoriaIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/convocatoriaid.typeorm';
import { PostulanteIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/postulanteid.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class DetalleConvocatoriaMapper {
  public static toTypeORM(convocatoria: DetalleConvocatoria): DetalleConvocatoriaTypeORM {
    const convocatoriaTypeORM: DetalleConvocatoriaTypeORM = new DetalleConvocatoriaTypeORM();
    convocatoriaTypeORM.convocatoriaId = ConvocatoriaIdTypeORM.from(convocatoria.getConvocatoriaId().getValue());
    convocatoriaTypeORM.postulanteId = PostulanteIdTypeORM.from(convocatoria.getPostulanteId().getValue());
    const createdAt: string = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getCreatedAt() != null ? convocatoria.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getCreatedBy() != null ? convocatoria.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getUpdatedAt() != null ? convocatoria.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getUpdatedBy() != null ? convocatoria.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    convocatoriaTypeORM.auditTrail = auditTrailTypeORM;
    return convocatoriaTypeORM;
  }
}