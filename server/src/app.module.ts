import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { AmoCrmModule } from "./amo-crm/amo-crm.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"

@Module({
  controllers: [AppController],

  imports: [
    AmoCrmModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],

  providers: [AppService],
})
export class AppModule {}
