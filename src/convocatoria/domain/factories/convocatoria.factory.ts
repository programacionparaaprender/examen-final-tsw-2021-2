import { CustomerId } from '../value-objects/customer-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { ConvocatoriaName } from '../../../common/domain/value-objects/convocatoria-name.value';
import { Convocatoria } from '../entities/convocatoria.entity';
import { Ruc } from '../value-objects/ruc.value';

export class ConvocatoriaFactory {
  public static createFrom(name: ConvocatoriaName, auditTrail: AuditTrail): Convocatoria {
    return new Convocatoria(name, auditTrail);
  }
}