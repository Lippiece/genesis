<script setup lang="ts">
import result from './components/result.vue';
import axios from 'axios';
import { useAmoStore } from './stores/amo';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const { leads, contacts, companies, test } = storeToRefs(useAmoStore())
const { addLead, addContact, addCompany } = useAmoStore()
const selected = ref('null');
const loading = ref(false);

const createEntity = async (event) => {
  event.preventDefault()

  if (selected.value === 'null') return

  loading.value = true

  const response = await axios.post(`https://genesis-api-2cug.onrender.com/amo-crm/${selected.value}`)

  switch (selected.value) {
    case 'lead':
      addLead(response.data)
      break
    case 'contact':
      addContact(response.data)
      break
    case 'company':
      addCompany(response.data)
      break
    default:
      break;
  };

  loading.value = false
}
</script>

<template>
  <header class="flex justify-center my-8">
    <h1 class="text-3xl font-bold">AmoCRM</h1>
  </header>

  <main class="grid grid-cols-3 grid-rows-2 gap-4">
    <form class="flex flex-col gap-4 col-span-3">
      <select name="entity" id="entity" class="p-1 text-gray-700 rounded border-2 border-slate-400 focus:outline-none"
        @change="selected = $event.target.value">
        <option class="text-gray-700 hover:text-gray-500 bg-white hover:bg-gray-100" value="null">Не выбрано</option>
        <option value="lead">Сделка</option>
        <option value="contact">Контакт</option>
        <option value="company">Компания</option>
      </select>

      <button :disabled="selected === 'null'"
        class="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-slate-200 disabled:text-black flex justify-center items-center shrink max-w-24 h-10"
        :class='loading ? " max-w-10" : ""' @click="createEntity">
        {{ loading ? '' : 'Создать' }}
        <svg v-if="loading" width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor"
            d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">
            <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate"
              values="0 12 12;360 12 12" />
          </path>
        </svg>
      </button>
    </form>

    <result type="lead">
      <ul>
        <li v-for="lead in leads" :key="lead">{{ lead }}</li>
      </ul>
    </result>

    <result type="contact">
      <ul>
        <li v-for="contact in contacts" :key="contact">{{ contact }}</li>
      </ul>
    </result>

    <result type="company">
      <ul>
        <li v-for="company in companies" :key="company">{{ company }}</li>
      </ul>
    </result>

  </main>
</template>

<style>
select>option {
  color: #000;
  background-color: #fff;
  text-shadow: 0 1px 0 #fff;
  box-shadow: 0 1px 0 #fff;
  border: 1px solid #ccc;
  padding: 3px;
}
</style>
