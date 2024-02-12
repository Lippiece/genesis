import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { AxiosError } from "axios"
import { catchError, firstValueFrom } from "rxjs"

@Injectable()
export class AmoCrmService {
  constructor(private readonly http: HttpService) {}

  async createCompany() {
    const { access_token, base_domain } = await this.authenticate()

    const { data } = await firstValueFrom(
      this.http
        .post(`https://${base_domain}/api/v4/companies`, [{ name: "test" }], {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data["validation-errors"][0].errors)

            throw "An error happened!"
          }),
        ),
    )

    return data._embedded.companies[0].id
  }

  async createContact() {
    const { access_token, base_domain } = await this.authenticate()

    const { data } = await firstValueFrom(
      this.http
        .post(`https://${base_domain}/api/v4/contacts`, [{ name: "test" }], {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data["validation-errors"][0].errors)

            throw "An error happened!"
          }),
        ),
    )

    return data._embedded.contacts[0].id
  }

  async authenticate() {
    const tokenResponse = await firstValueFrom(
      this.http.get("https://test.gnzs.ru/oauth/get-token.php", {
        headers: {
          "X-Client-Id": "CLIENT_ID",
        },
      }),
    )

    const { access_token, base_domain } = tokenResponse.data

    return { access_token, base_domain }
  }

  async createLead() {
    const { access_token, base_domain } = await this.authenticate()

    const { data } = await firstValueFrom(
      this.http
        .post(`https://${base_domain}/api/v4/leads`, [{ name: "test" }], {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data["validation-errors"][0].errors)

            throw "An error happened!"
          }),
        ),
    )

    return data._embedded.leads[0].id
  }
}
