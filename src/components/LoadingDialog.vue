<template>
  <v-dialog
      max-width="600" width="300"
      :value="value" @input="$emit('value', false)"
      persistent
  >
    <v-card style="padding: 20px; text-align: left; display: flex; align-items: center">
      <v-progress-circular indeterminate color="primary" />
      <p style="margin-left: 20px; margin-bottom: 0;">
        {{ message }}
      </p>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from "vue";

const props = defineProps(['model', 'value', 'message']);
const emit = defineEmits(['closeModal'])

onMounted(() => {
  setTimeout(() => {
    emit('closeModal')
  }, 5000)

});
</script>
