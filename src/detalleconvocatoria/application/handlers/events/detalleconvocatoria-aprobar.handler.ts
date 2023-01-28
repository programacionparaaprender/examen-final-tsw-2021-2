import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { DetalleConvocatoriaAprobar } from '../../../domain/events/detalleconvocatoria-aprobar.event';

@EventsHandler(DetalleConvocatoriaAprobar)
export class DetalleConvocatoriaAprobarHandler implements IEventHandler<DetalleConvocatoriaAprobar> {
  constructor() {}

  handle(event: DetalleConvocatoriaAprobar) {
    console.log('handle logic for DetalleConvocatoriaAprobar');
    console.log(event);
  }
}