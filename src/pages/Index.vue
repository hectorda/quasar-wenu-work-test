<template>
  <q-page>
    <div class="q-pa-lg row justify-between items-center">
      <div class="col">
        <q-pagination v-model="page" :max="pages" input class="text-center" />
      </div>
      <div class="col" v-show="!isAuthenticated">
         <q-btn
            label="Para Administrar Favoritos Inicie Sesión"
            @click="$router.replace('/login')"
            color="info"
          />
      </div>
      <div class="col">
        <q-input outlined v-model="filter" label="Filtrar por Nombre" />
      </div>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card full-height"
        v-for="row in rows"
        :key="row.id"
        flat
        bordered
      >
        <q-img :src="row.image">
          <div class="absolute-bottom text-h6">
            {{ row.name }}
          </div>
        </q-img>
        <q-card-section>
          <div class="text-h6">{{ row.gender }}</div>
          <div class="text-h6"><b>Status:</b> {{ row.status }}</div>
        </q-card-section>
        <q-card-actions>
          <q-btn round color="grey" @click="setFavorite(row)" icon="star" v-show="isAuthenticated">
            <q-tooltip> Marcar como favorito</q-tooltip>
          </q-btn>
         <!--  <q-btn round color="primary" @click="setFavorite(row)" icon="preview">
            <q-tooltip> Ver mas Información</q-tooltip>
          </q-btn> -->

          <q-space />

          <q-btn color="grey" round flat dense @click="setFavorite(row)">
            <q-tooltip> Marcar como favorito</q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </div> 
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="page" :max="pages" input />
    </div>
  </q-page>
</template>


<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      loading: true,
      page: 1,
      pages: 1,
      showFavorites: false,
      filter: "",
      rows:[]
    };
  },
  mounted: function () {
    this.getCharacterList();
  },
  methods: {
    setFavorite: function (row) {
      console.log(row);
    },
    getCharacterList: function () {
      const filterName = this.filter ? "&name=" + this.filter : "";
      axios
        .get(
          "https://rickandmortyapi.com/api/character?page=" +
            this.page +
            filterName
        )
        .then((response) => {
          this.rows = response.data.results;
          this.pagination = response.data.info;
          this.pages = response.data.info.pages;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getAllLocations() {
      axios
        .get("https://rickandmortyapi.com/api/character?page=" + this.page)
        .then((response) => {
          this.rows = response.data.results;
          this.pagination = response.data.info;
          this.pages = response.data.info.pages;
        })
        .catch((error) => {
          console.log("error", error.response.status);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed:{
    ...mapGetters('auth', ['isAuthenticated'])
  },
  watch: {
    page: function () {
      this.getCharacterList();
    },
    filter: function () {
      this.page = 1;
      this.getCharacterList();
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width:100%
  width: 210px
</style>
