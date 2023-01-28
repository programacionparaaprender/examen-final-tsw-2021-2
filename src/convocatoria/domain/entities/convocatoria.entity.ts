import { AggregateRoot } from '@nestjs/cqrs';
import { ConvocatoriaId } from '../value-objects/convocatoria-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';

import { ConvocatoriaName } from '../../../common/domain/value-objects/convocatoria-name.value';
import { ConvocatoriaRegistered } from '../events/convocatoria-registered.event';


export class Convocatoria extends AggregateRoot {
  protected id: ConvocatoriaId;
  private name: ConvocatoriaName;
  protected readonly auditTrail: AuditTrail;

  public constructor(name: ConvocatoriaName, auditTrail: AuditTrail) {
    super();
    this.name = name;
    this.auditTrail = auditTrail;
  }

  public getName(): ConvocatoriaName {
    return this.name;
  }

  public changeName(name: ConvocatoriaName) {
    this.name = name;
  }

  public getId(): ConvocatoriaId {
    return this.id;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: ConvocatoriaId) {
    this.id = id;
  }

  public register() {
    const event = new ConvocatoriaRegistered(this.id.getValue(), this.name.getValue());
    this.apply(event);
  }

}