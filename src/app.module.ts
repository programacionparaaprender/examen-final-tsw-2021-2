import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';

//Convocatoria
import { ConvocatoriaModule } from './convocatoria/convocatoria.module';

//Detalle Convocatoria
import { DetalleConvocatoriaModule } from './detalleconvocatoria/detalleconvocatoria.module';

//Postulante
import { PostulanteModule } from './postulante/postulante.module';

@Module({
  imports: [
    CustomersModule,
    AccountsModule,
    TransactionsModule,
    ConvocatoriaModule,
    DetalleConvocatoriaModule,
    PostulanteModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}