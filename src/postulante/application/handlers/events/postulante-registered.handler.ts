import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { PostulanteRegistered } from '../../../domain/events/postulante-registered.event';

@EventsHandler(PostulanteRegistered)
export class PostulanteRegisteredHandler implements IEventHandler<PostulanteRegistered> {
  constructor() {}

  handle(event: PostulanteRegistered) {
    console.log('handle logic for PostulanteRegistered');
    console.log(event);
  }
}