<template>
  <div class="ma-16">
    <h1>Loading Dialog Component</h1>
    <loading-dialog v-model="showModal" message="Data is loading ..." @closeModal="closeModal()"/>
  </div>
</template>

<script setup>
import LoadingDialog from "@/components/LoadingDialog.vue";
import {ref} from "vue";

const showModal = ref(true);

const closeModal = () => {
  showModal.value = false;
}

</script>