<template>
  <v-dialog max-width="600" width="300" persistent :value="value" @input="$emit('value', false)">
    <div class="d-flex pa-5 bg-white rounded align-center">
      <v-progress-circular indeterminate=true color="primary" class="mr-5"/>
      <p>
        {{ message }}
      </p>
    </div>
  </v-dialog>
</template>

<script setup>
import {onMounted} from "vue";

const props = defineProps(['value', 'message']);
const emit = defineEmits(['closeModal'])

onMounted(() => {
  setTimeout(() => {
    emit('closeModal')
  }, 5000)
});
</script>
