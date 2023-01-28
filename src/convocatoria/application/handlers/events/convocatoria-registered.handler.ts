import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ConvocatoriaRegistered } from '../../../domain/events/convocatoria-registered.event';

@EventsHandler(ConvocatoriaRegistered)
export class ConvocatoriaRegisteredHandler implements IEventHandler<ConvocatoriaRegistered> {
  constructor() {}

  handle(event: ConvocatoriaRegistered) {
    console.log('handle logic for ConvocatoriaRegistered');
    console.log(event);
  }
}