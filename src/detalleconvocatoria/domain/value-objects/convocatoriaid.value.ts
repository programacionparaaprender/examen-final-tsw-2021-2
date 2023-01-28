import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class ConvocatoriaId {
  private readonly convocatoriaId: number;

  private constructor(convocatoriaId: number) {
    this.convocatoriaId = convocatoriaId;
  }

  public getValue(): number {
    return this.convocatoriaId;
  }


  public static create(convocatoriaId: number): Result<AppNotification, ConvocatoriaId> {
    let notification: AppNotification = new AppNotification();
   
    if (convocatoriaId <= 0) {
      notification.addError('convocatoria id is required', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new ConvocatoriaId(convocatoriaId));
  }
  public static of(value: number): ConvocatoriaId {
    return new ConvocatoriaId(value);
  }
}