<template>
  <div class="ma-16">
    <h1>LoadingDialogView</h1>
    <loading-dialog v-model="showModal" message="hello World" @closeModal="closeModal()" />
  </div>
</template>

<script setup>
import LoadingDialog from "@/components/LoadingDialog.vue";
import {ref, onMounted} from "vue";

const showModal = ref(true);

const closeModal = () => {
  showModal.value = false;
}

</script>