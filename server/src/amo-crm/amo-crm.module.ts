import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"

import { AmoCrmController } from "./amo-crm.controller"
import { AmoCrmService } from "./amo-crm.service"

@Module({
  controllers: [AmoCrmController],
  imports    : [HttpModule],
  providers  : [AmoCrmService],
})
export class AmoCrmModule {}
