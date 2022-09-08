<template>
  <div class="ma-16">
    <h1>Form Component</h1>
    <Form @onSubmit="onSubmit">
      <slot>
        <v-text-field :rules="[required(), email()]" label="Email" type="email" v-model="credentials.email"/>
        <v-text-field :rules="[required()]" label="Password" type="password" v-model="credentials.password"/>
      </slot>
      <template #actions="actionsProps">
        <v-btn color="primary" @click="deleteClicked(actionsProps.context)">
          Delete
        </v-btn>
      </template>
    </Form>
  </div>
</template>

<script setup>
import Form from '@/components/Form.vue';
import {ref} from "vue";
import {required, email} from "@/utils/validators";


const credentials = ref({
  email: '',
  password: ''
})

const onSubmit = () => {
  console.log('Submitted Outside');
}

const deleteClicked = (context) => {
  context.resetForm();
  context.changeLoadingMessage('Deleting...');
  context.changeLoadingStatus(true);
  setTimeout(() => {
    context.changeLoadingStatus(false);
    context.reportError('Error found in the deleting process.');
  }, 3000);
}

</script>