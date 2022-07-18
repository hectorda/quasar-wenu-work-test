<template>
  <div class="row mt-2 q-mt-md">
    <div class="col-md-6 offset-md-3 text-center">
      <h4>Iniciar Sesión</h4>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="username"
          label="Usuario *"
          hint="Usuario"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Ingrese su usuario']"
        />
        <q-input
          filled
          type="password"
          v-model="password"
          label="Contraseña *"
          hint="Contraseña"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Ingrese su contraseña']"
        />

        <div>
          <q-btn label="Iniciar Sesión" type="submit" color="primary" />
          <q-btn
            label="Limpiar Campos"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn
            label="Registrar"
            @click="$router.replace('/register')"
            color="info"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },

  methods: {
    ...mapActions("auth", ["doLogin"]),
    async onSubmit() {
      if (this.username && this.password) {
        try {
          this.doLogin({
            username: this.username,
            password: this.password,
          });
          this.$router.push({name: 'Home'})
        } catch (error) {
          console.log(error.message);
        }
      }
    },
    onReset() {
      this.username = null;
      this.password = null;
    },
  },
  computed: {
    api_url() {
      return process.env.API_URL;
    },
  },
};
</script>
