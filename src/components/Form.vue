<template>
  <v-card class="form">
    <v-form ref="form">
      <slot/>
    </v-form>
    <div class="d-flex flex-column flex-md-row mt-7 justify-end" style="gap: 10px">
      <slot name="actions" :context="submitContext"/>
      <v-btn :disabled="disabled" elevation="0" color="primary" @click="submit">
        <span style="padding: 0 10px">Submit</span>
      </v-btn>
    </div>
    <loading-dialog v-model="loading" :message="loadingMessage"/>
    <error-dialog v-model="error" title="Alert" :description="errorVal" @closeModal="error = false"/>
  </v-card>
</template>

<script setup>
import LoadingDialog from "@/components/LoadingDialog.vue"
import ErrorDialog from "@/components/ErrorDialog.vue"
import {onMounted, ref} from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
    required: false
  }
})

const emit = defineEmits(['onSubmit'])

const form = ref(null);

const error = ref(false);
const loading = ref(false);
const errorVal = ref({});
const loadingMessage = ref('');
const submitContext = ref({});

onMounted(() => {
  submitContext.value.validate = form.value.validate;
  submitContext.value.resetForm = form.value.reset;
  submitContext.value.reportError = reportError;
  submitContext.value.changeLoadingStatus = changeLoadingStatus;
  submitContext.value.changeLoadingMessage = changeLoadingMessage;
})

const changeLoadingStatus = (status = true) => {
  loading.value = status;
}

const changeLoadingMessage = (message) => {
  loadingMessage.value = message;
}

const reportError = (message) => {
  error.value = true;
  errorVal.value = message;
}

const submit = async () => {
  let {valid: isValid} = await form.value.validate();

  if (isValid) {
    changeLoadingMessage('Submitting...');
    changeLoadingStatus(true);
    emit("onSubmit")
    changeLoadingStatus(false);
    form.value.reset();
  } else {
    reportError("Please fill all the fields correctly")
  }
}

</script>

<style scoped>
.form {
  width: 600px;
  padding: 40px;
  margin: 50px auto;
  border-radius: 8px;
}
</style>
