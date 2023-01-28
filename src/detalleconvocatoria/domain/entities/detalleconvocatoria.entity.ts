import { AggregateRoot } from '@nestjs/cqrs';
import { ConvocatoriaId } from '../value-objects/convocatoriaid.value';
import { PostulanteId } from '../value-objects/postulanteid.value';
import { DetalleConvocatoriaId } from '../value-objects/detalleconvocatoriaid.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';

import { ConvocatoriaName } from '../../../common/domain/value-objects/convocatoria-name.value';
import { DetalleConvocatoriaRegistered } from '../events/detalleconvocatoria-registered.event';


export class DetalleConvocatoria extends AggregateRoot {
  protected id: DetalleConvocatoriaId;
  private convocatoriaId: ConvocatoriaId;
  private postulanteId: PostulanteId;
  protected readonly auditTrail: AuditTrail;

  public constructor(convocatoriaId: ConvocatoriaId, postulanteId: PostulanteId, auditTrail: AuditTrail) {
    super();
    this.convocatoriaId = convocatoriaId;
    this.postulanteId = postulanteId;
    this.auditTrail = auditTrail;
  }

  public getConvocatoriaId(): ConvocatoriaId {
    return this.convocatoriaId;
  }

  public changeConvocatoria(convocatoriaId: ConvocatoriaId) {
    this.convocatoriaId = convocatoriaId;
  }

  public getPostulanteId(): PostulanteId {
    return this.postulanteId;
  }

  public changePostulanteId(postulanteId: PostulanteId) {
    this.postulanteId = postulanteId;
  }

  public getId(): DetalleConvocatoriaId {
    return this.id;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: DetalleConvocatoriaId) {
    this.id = id;
  }

  public register() {
    const event = new DetalleConvocatoriaRegistered(this.id.getValue(), this.convocatoriaId.getValue(),this.postulanteId.getValue());
    this.apply(event);
  }

}