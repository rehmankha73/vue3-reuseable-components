<template>
  <div class="ma-16">
    <h1>Error Dialog Component</h1>
    <error-dialog v-model="showDialog" :title="title" :description="description" @closeModal="closeModal"/>
  </div>
</template>

<script setup>
import ErrorDialog from '@/components/ErrorDialog.vue'
import {ref} from "vue";


const showDialog = ref(true)
const title = ref("API Down")
const description = ref("The API is down. Please try again later.")

const closeModal = () => {
  showDialog.value = false
}


</script>

<style scoped>

</style>