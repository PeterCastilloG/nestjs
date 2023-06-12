import { Module , MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(/* Middleware que desees utilizar */)
      .exclude({ path: 'api/health', method: RequestMethod.ALL }) // Excluir rutas específicas del prefijo
      .forRoutes('*'); // Aplicar el middleware a todas las rutas
  }
}
