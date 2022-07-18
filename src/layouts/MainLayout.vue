<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Prueba</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section>
              Personajes
            </q-item-section>
          </q-item>
          <q-list padding>
            <q-item
              clickable
              v-ripple
              to="favorites"
              exact
              v-show="isAuthenticated"            >
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section> Mis Favoritos </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              v-show="isAuthenticated"
              @click="loginOut"
            >
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section> Cerrar Sesión </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">
              {{ isAuthenticated ? ('Bienvenido: '+getUser.username) : "Modo Invitado" }}
            </div> 
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    loginOut() {
      this.signOut();
      this.$router.push({name: 'Home'})
    },
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "getUser"]),
  },
};
</script>
