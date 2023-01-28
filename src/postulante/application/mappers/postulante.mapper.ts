import { RucTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/ruc.typeorm';
import { Postulante } from '../../domain/entities/postulante.entity';

import { ConvocatoriaNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/convocatoria-name.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { Dni } from '../../../common/domain/value-objects/dni.value';
import { PersonName } from '../../../common/domain/value-objects/person-name.value';
import { PostulanteTypeORM } from '../../infrastructure/persistence/typeorm/entities/postulante.typeorm';

import { PersonNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/person-name.typeorm';
import { DniTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/dni.typeorm';


export class PostulanteMapper {
  public static toTypeORM(convocatoria: Postulante): PostulanteTypeORM {
    const personTypeORM: PostulanteTypeORM = new PostulanteTypeORM();
    personTypeORM.name = PersonNameTypeORM.from(convocatoria.getName().getFirstName(), convocatoria.getName().getLastName());
    personTypeORM.dni = DniTypeORM.from(convocatoria.getDni().getValue());
    const createdAt: string = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getCreatedAt() != null ? convocatoria.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getCreatedBy() != null ? convocatoria.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getUpdatedAt() != null ? convocatoria.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getUpdatedBy() != null ? convocatoria.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    personTypeORM.auditTrail = auditTrailTypeORM;
    return personTypeORM;
  }
}