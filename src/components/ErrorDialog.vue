<template>
  <v-dialog hide-overlay max-width="600" width="450"
            :value="value" @input="$emit('value', false)">
    <v-card style="padding: 10px 0;">
      <v-card-title style="font-family: google-sans, sans-serif; font-size: 24px">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ description }}
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" border elevation="0" @click="$emit('closeModal')">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps(['value', 'title', 'description'])
const emit = defineEmits(['closeModal'])

</script>
