import { ref } from "vue"
import { defineStore } from "pinia"

export const useAmoStore = defineStore("counter", () => {
  const test = ref(0)
  const leads = ref<number[]>([])
  const companies = ref<number[]>([])
  const contacts = ref<number[]>([])

  const addLead = (lead: number) => {
    leads.value.push(lead)
  }
  const addCompany = (company: number) => {
    companies.value.push(company)
  }
  const addContact = (contact: number) => {
    contacts.value.push(contact)
  }

  return { test, leads, companies, contacts, addLead, addCompany, addContact }
})
