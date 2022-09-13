<template>
  <v-card id="datatable" class="overflow-auto" width="100%" height="100%">
    <v-card-title>
      <v-row class="py-2 align-center">
        <v-col class="v-col-12 v-col-md-4">
          <h2 class="text-h5 w-100">Serverside Datatable</h2>
        </v-col>
        <v-col class="v-col-12 v-col-md-8">
          <div class="w-50 d-flex align-center w-100 flex-wrap" style="row-gap: 5px">
            <div class="d-flex" style="flex-grow: 1; min-width: 350px">
              <input type="text" v-on:keydown.enter="onChangeSearch" v-model="searchText"
                     placeholder="Search" class="w-100 rounded searchInput"/>

              <v-btn elevation="0" @click="onChangeSearch" class="mr-2 searchIcon">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </div>

            <slot name="mainActions"/>

            <v-btn color="primary" @click="$emit('add-new')">
              Add New
            </v-btn>
            <v-btn @click="refresh" elevation="0" icon class="ml-2">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <v-table>
      <thead class="bg-white" style="position:sticky; top:0; z-index: 2">
      <tr>
        <th v-for="(head, index) in headers" :key="index" class="text-left">
          {{ head }}
        </th>
        <th>
          Actions
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index1) in displayItems" v-if="displayItems.length > 0" :key="index1">
        <td v-for="(key, index2) in Object.keys(item)" :key="index2" v-html="item[key]"/>
        <td class="d-flex justify-space-around align-center">
          <v-icon style="cursor: pointer" @click="$emit('view',item)" color="green">mdi-eye</v-icon>
          <v-icon style="cursor: pointer" @click="$emit('edit',item)" color="blue">mdi-pencil</v-icon>
          <v-icon v-if="showDeleteBtn" style="cursor: pointer" @click="confirmDelete(item)" color="red">mdi-delete
          </v-icon>

          <slot name="actions" :item="item"/>

        </td>
      </tr>
      <tr v-else>
        <td colspan="100%" class="text-center">
          No Data Found
        </td>
      </tr>
      </tbody>
    </v-table>
    <v-card-title class="d-flex justify-space-between align-center pa-4">
      <div class="d-flex align-center">
        <slot name="footer"/>
      </div>
      <div>
        <span v-if="displayItems.length > 0" class="mx-2" style="font-size: 15px">
          {{
            currentPage === 1 ? 1 : ((currentPage - 1) * recordsPerPage) + 1
          }} - {{ ((currentPage - 1) * recordsPerPage) + displayItems.length }} of {{ items.length }}
        </span>
        <v-btn color="primary" :disabled="currentPage <= 1" @click="goBack" class="mx-2" icon elevation="0"
               style="height:35px;width:35px">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn color="primary" :disabled="currentPage === Math.ceil(totalRecords / recordsPerPage)" @click="goForward"
               class="mx-2" icon elevation="0" style="height:35px;width:35px">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-card-title>
  </v-card>
</template>

<script setup>

import {computed, onMounted, ref, watch} from "vue";


const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  recordsPerPage: {
    type: String,
    default: '15'
  },
  showDeleteBtn: {
    type: Boolean,
    default: true
  },
  searchBy: {
    type: Array,
    default: null,
    required: true
  }
})

const emit = defineEmits(['add-new', 'view', 'edit', 'delete', 'currentlyDisplayedItems'])

const displayItems = ref([])

const currentPage = ref(1)

const searchText = ref("")

onMounted(() => {
  displayItems.value = props.items.slice(0, parseInt(props.recordsPerPage))
})

watch(() => props.items, () => {
  currentPage.value = 1
  displayItems.value = props.items.slice(0, parseInt(props.recordsPerPage))
})


watch(() => props.recordsPerPage, (newValue) => {
  currentPage.value = 1
  displayItems.value = props.items.slice(0, parseInt(newValue))
})

watch(displayItems, (newValue) => {
  emit('currentlyDisplayedItems', newValue)
})

const totalRecords = computed(() => props.items.length)


const goBack = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    displayItems.value = props.items.slice((currentPage.value - 1) * parseInt(props.recordsPerPage), currentPage.value * parseInt(props.recordsPerPage))
  }
}

const goForward = () => {
  if (currentPage.value < Math.ceil(totalRecords.value / parseInt(props.recordsPerPage))) {
    currentPage.value++
    displayItems.value = props.items.slice((currentPage.value - 1) * parseInt(props.recordsPerPage), currentPage.value * parseInt(props.recordsPerPage))
  }
}

const refresh = () => {
  currentPage.value = 1
  displayItems.value = props.items.slice(0, parseInt(props.recordsPerPage))
}


const onChangeSearch = () => {
  if (searchText.value && props.searchBy.length > 0) {
    displayItems.value = props.items.filter(item => {
      let isFound = false
      props.searchBy.forEach(key => {
        if (item[key].toString().toLowerCase().includes(searchText.value.toLowerCase())) {
          isFound = true
        }
      })
      return isFound
    })
  } else {
    displayItems.value = props.items.slice(0, parseInt(props.recordsPerPage))
  }

  // Reset currentPage
  currentPage.value = 1
}

const confirmDelete = (item) => {
  let isConfirmed = confirm("Are you sure you want to delete this item?")
  if (isConfirmed) {
    emit('delete', item)
  }
}


</script>

<style scoped>

.searchInput {
  border: 1.5px solid darkgray;
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
  border-right: none;
  padding: 2px 10px;
  outline: none;
  font-size: 17px
}

.searchInput:focus {
  border-color: #3f51b5;
}

.searchIcon {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
  border: 1.5px solid #6e14ef;
  background: #6e14ef;
  color: white;
  font-size: 20px;
  padding: 18px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.searchIcon:hover {
  background: #3f51b5;
}

</style>


<style>

#datatable .v-table {
  height: calc(100% - 150px) !important;
}

#datatable .v-table__wrapper {
  height: 100% !important;
  overflow: auto;
}

</style>