import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class PostulanteId {
  private readonly postulanteId: number;

  private constructor(postulanteId: number) {
    this.postulanteId = postulanteId;
  }

  public getValue(): number {
    return this.postulanteId;
  }


  public static create(postulanteId: number): Result<AppNotification, PostulanteId> {
    let notification: AppNotification = new AppNotification();
   
    if (postulanteId <= 0) {
      notification.addError('postulante id is required', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new PostulanteId(postulanteId));
  }
  public static of(value: number): PostulanteId {
    return new PostulanteId(value);
  }
}