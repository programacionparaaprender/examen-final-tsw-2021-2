import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { DetalleConvocatoriaRegistered } from '../../../domain/events/detalleconvocatoria-registered.event';

@EventsHandler(DetalleConvocatoriaRegistered)
export class DetalleConvocatoriaRegisteredHandler implements IEventHandler<DetalleConvocatoriaRegistered> {
  constructor() {}

  handle(event: DetalleConvocatoriaRegistered) {
    console.log('handle logic for DetalleConvocatoriaRegistered');
    console.log(event);
  }
}