import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class ConvocatoriaName {
  private readonly convocatoriaName: string;
  private static MAX_LENGTH: number = 75;

  private constructor(convocatoriaName: string) {
    this.convocatoriaName = convocatoriaName;
  }

  public getValue(): string {
    return this.convocatoriaName;
  }

  public getConvocatoriaName(): string {
    return this.convocatoriaName;
  }

  public static create(convocatoriaName: string): Result<AppNotification, ConvocatoriaName> {
    let notification: AppNotification = new AppNotification();
    convocatoriaName = (convocatoriaName ?? "").trim();
    
    if (convocatoriaName === "") {
      notification.addError('convocatoriaName is required', null);
    }

    if (convocatoriaName.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an convocatoriaName is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new ConvocatoriaName(convocatoriaName));
  }
}