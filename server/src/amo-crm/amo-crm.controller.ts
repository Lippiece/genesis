import { Controller, Post } from "@nestjs/common"

import { AmoCrmService } from "./amo-crm.service"

@Controller("amo-crm")
export class AmoCrmController {
  constructor(private readonly amoCrmService: AmoCrmService) {}

  @Post("company")
  async createCompany() {
    return await this.amoCrmService.createCompany()
  }

  @Post("contact")
  async createContact() {
    return await this.amoCrmService.createContact()
  }

  @Post("lead")
  async createLead() {
    return await this.amoCrmService.createLead()
  }
}
