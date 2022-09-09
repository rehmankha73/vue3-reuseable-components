<template>
  <v-app>
    <v-app-bar app dark color="primary" elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>

      <v-card-title>Sparko Sol</v-card-title>
      <v-spacer/>

      <!--      <profile-popup/>-->
    </v-app-bar>
    <v-main class="main-bg">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="drawer" app>
      <img src="../assets/logo.png" alt="logo" class="logo" height="70"/>
      <v-divider/>
      <template :key="key" v-for="(route, key) in routes">
        <v-list-item
            v-if="!route.isDivider"
            class="route"
            color="#508eca"
            active-class="route--active"
            exact
            dense
            :to="route.to"
        >
          <v-list-item-media>
            <v-icon icon="mdi-account-group"/>
          </v-list-item-media>
          <v-list-item-title v-text="route.title"/>
        </v-list-item>

        <v-list-item v-else>
          <v-divider style="margin: 10px 20px"/>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <LoadingDialog v-model="loading" message="Loading..."/>
    <v-snackbar
        v-model="snackbar"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
            v-if="snackbarText !== 'Loading...'"
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import {getUser} from "@/utils/local";
import LoadingDialog from "@/components/LoadingDialog.vue";
import {onMounted, ref} from "vue";
import {useDisplay} from 'vuetify'

const drawer = ref(false);
const user = ref({});
const message = ref(null);
const loading = ref(false);
const localDrawer = ref(true);
const snackbar = ref(false);
const snackbarText = ref("Loading...");
const routes = ref([
  {
    to: '/users',
    title: 'Users',
    icon: 'mdi-account-group',
  },
  {
    to: '/account-deletion-requests',
    title: 'Account Deletion Requests',
    icon: 'mdi-account-group',
  },
  {
    isDivider: true,
  },
  {
    to: '/customers',
    title: 'Customers',
    icon: 'mdi-account-group',
  },
]);

onMounted(() => {
  user.value = getUser()
  drawer.value = getDrawer();
})

const getDrawer = () => {
  const {lgAndUp} = useDisplay()
  return lgAndUp.value
}

</script>

<style scoped>
.logo {
  display: block;
  margin: 5px auto;
  border-radius: 10px;
}

.route {
  margin: 5px;
  text-align: left;
  overflow: hidden;
  border-radius: 4px;
  font-size: 20px !important;
  font-family: "Roboto", sans-serif;
}

.route i {
  font-size: 20px;
}

.route--active i {
  color: inherit;
}

.route--active {
  color: #495db7;
}

.main-bg {
  background: linear-gradient(to bottom, #1976d2 300px, white 300px);
}
</style>
