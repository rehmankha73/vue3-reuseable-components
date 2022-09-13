<template>
  <div class="d-flex justify-end" style="width: 100%;">
    <div style="position: relative; width:fit-content;">
      <v-btn @click="showDropDown = !showDropDown" class="pa-5 h-100 bg-yellow-darken-2 text-black font-weight-bold" elevation="2">JK
      </v-btn>
      <div v-if="showDropDown" @click="stopPropagation" class="dropdown">
        <v-card class="pa-4 profile-view__popup " elevation="4">
          <v-card-title>
            <div class="profile-view__image">
              <div class="profile-view__letter">JK</div>
            </div>
          </v-card-title>
          <v-spacer/>

          <v-divider style="margin: 10px 0"/>

          <p class="display-name">Jasir Ullah Khan</p>
          <p class="username">jasirullah12345@gmail.com</p>

          <v-divider style="margin: 10px 0"/>

          <template v-for="(item, key) in items">
            <v-list-item
                v-if="item.title"
                :key="key"
                dense
                class="border my-1 rounded"
                :to="item.to"
            >
              <v-list-item-title v-text="item.title"/>
            </v-list-item>
          </template>

          <v-divider style="margin: 0; margin-top: 8px"/>

          <div class="profile-view__popup__actions">
            <v-spacer/>
            <v-btn elevation="0" to="/logout" color="black" class="border" style="text-transform: capitalize">Logout</v-btn>
          </div>

        </v-card>
      </div>
    </div>
    <div v-if="showDropDown" @click="showDropDown = !showDropDown" class="overlay"></div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const items = ref([
  {
    to: '/profile',
    title: 'Profile',
  },
  {
    to: '/settings',
    title: 'Settings',
  },
  {
    to: '/auth/password',
    title: 'Change Password',
  },
]);

const props = defineProps({
  showModal: {type: Boolean, default: false,}
});

const showDropDown = ref(false);


onMounted(()=>{
    if (props.showModal) {
      showDropDown.value = true;
    }
})


const stopPropagation = (event) => event.stopPropagation();

</script>

<style scoped>
.profile-view__popup {
  width: 350px;
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
  font-size: 14px;
  margin: 5px 0 0;
}

.overlay {
  position: fixed;
  background-color: black;
  opacity: 0;
  inset: 0;
  z-index: 2000;
}

.dropdown {
  position: fixed;
  z-index: 2500;
  top: 20px;
  right: 20px;
}
</style>