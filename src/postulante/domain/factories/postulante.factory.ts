import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Dni } from '../../../common/domain/value-objects/dni.value';
import { Postulante } from '../entities/postulante.entity';
import { PersonName } from '../../../common/domain/value-objects/person-name.value';

export class PostulanteFactory {
  public static createFrom(name: PersonName, dni: Dni, auditTrail: AuditTrail): Postulante {
    return new Postulante(name, dni, auditTrail);
  }
}