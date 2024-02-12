<script setup lang="ts">
const props = defineProps({
  type: String
})
const translatedType = {
  lead: 'Сделки',
  contact: 'Контакты',
  company: 'Компании'
}
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-xl font-bold">{{ translatedType[props.type] }}</h2>

    <slot></slot>
  </section>
</template>
