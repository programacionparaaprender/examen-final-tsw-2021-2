import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class DetalleConvocatoriaId {
  private readonly detalleconvocatoriaId: number;

  private constructor(detalleconvocatoriaId: number) {
    this.detalleconvocatoriaId = detalleconvocatoriaId;
  }

  public getValue(): number {
    return this.detalleconvocatoriaId;
  }

  public getConvocatoriaId(): number {
    return this.detalleconvocatoriaId;
  }

  public static create(detalleconvocatoriaId: number): Result<AppNotification, DetalleConvocatoriaId> {
    let notification: AppNotification = new AppNotification();
   
    if (detalleconvocatoriaId <= 0) {
      notification.addError('detalle convocatoria id is required', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new DetalleConvocatoriaId(detalleconvocatoriaId));
  }
  public static of(value: number): DetalleConvocatoriaId {
    return new DetalleConvocatoriaId(value);
  }
}