<template>
  <div class="mx-auto" style="width: 50%">
    <div class="mx-auto" style="border: 1px solid black">
      <v-btn @click="showDropDown = !showDropDown" color="primary" style="position: relative" elevation="2">R
        <div v-if="showDropDown" @click="stopPropagation" class="mx-auto dropdown" style="width: 50%">
          <v-card class="pa-4 profile-view__popup " elevation="4">
            <v-card-title>
              <div class="profile-view__image">
                <div class="profile-view__letter">RA</div>
              </div>
            </v-card-title>
            <v-spacer/>

            <v-divider style="margin: 10px 0"/>

            <p class="display-name">Rehman Ahmed Khan</p>
            <p class="username">Email</p>

            <template v-for="(item, key) in items">
              <v-list-item
                  v-if="item.isVisible"
                  :key="key"
                  dense
                  :to="item.to"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"/>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-divider style="margin: 0"/>

            <div class="profile-view__popup__actions">
              <v-spacer/>
              <v-btn elevation="0" color="black" style="text-transform: capitalize">Logout</v-btn>
            </div>

          </v-card>
        </div>
      </v-btn>
    </div>
    <div v-if="showDropDown" @click="showDropDown = !showDropDown" class="overlay"></div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const items = ref([
  {
    to: '/item-1',
    title: 'Item 1',
    icon: 'mdi-account-school',
    isVisible: true
  },
  {isDivider: true},
  {
    to: '/item-2',
    title: 'Item 2',
    icon: 'mdi-account-school',
    isVisible: true
  },
  {isDivider: true},
  {
    to: '/item-3',
    title: 'Item 3',
    icon: 'mdi-account-school',
    isVisible: true
  },
  {isDivider: true},
  {
    to: '/item-4',
    title: 'Item 4',
    icon: 'mdi-account-school',
    isVisible: true
  },
  {isDivider: true},
  {
    to: '/item-5',
    title: 'Item 5',
    icon: 'mdi-account-school',
    isVisible: true
  },
  {isDivider: true},
  {
    to: '/item-6',
    title: 'Item 6',
    icon: 'mdi-account-school',
    isVisible: true
  },
  {isDivider: true},
]);

const props = defineProps({
  test: {type: String, default: ''},
  showModal: {type: Boolean, default: false, required: true}
});

console.log(props.test)
const showDropDown = ref(false);

const stopPropagation = (event) => {
  console.log(event)
  event.stopPropagation();

}
</script>

<style scoped>
.profile-view__popup {
  width: 290px;
  padding: 15px;
  display: flex;
  text-align: center;
  flex-direction: column;
}

.profile-view__image {
  width: 80px;
  height: 80px;
  background: #f5c187;
  margin: 0 auto;
  border-radius: 40px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-view__letter {
  font-size: 25px;
  color: rgba(0, 0, 0, .7);
  font-family: google-sans, sans-serif;
}

.profile-view__popup__actions {
  margin-top: 10px;
  display: flex;
}

.display-name {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.username {
  margin: 0;
}

.overlay {
  width: 100%;
  background-color: black;
  opacity: 0;
  position: absolute;
  inset: 0;
  z-index: 1;
}

.dropdown {
  position: absolute;
  top: 10%;
  right: 0;
  transform: translateX(-100%);
  z-index: 5;
}

</style>