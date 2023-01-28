import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { ConvocatoriaId } from '../value-objects/convocatoriaid.value';
import { PostulanteId } from '../value-objects/postulanteid.value';
import { ConvocatoriaName } from '../../../common/domain/value-objects/convocatoria-name.value';
import { DetalleConvocatoria } from '../entities/detalleconvocatoria.entity';


export class DetalleConvocatoriaFactory {
  public static createFrom(convocatoriaId: ConvocatoriaId, postulanteId: PostulanteId,  auditTrail: AuditTrail): DetalleConvocatoria {
    return new DetalleConvocatoria(convocatoriaId, postulanteId, auditTrail);
  }
}