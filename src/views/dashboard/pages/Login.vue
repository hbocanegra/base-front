<template>
  <v-container
    id="login"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
        sm="8"
      >
        <v-img
          src="@/assets/logo.png"
          aspect-ratio="3.5"
          contain
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
        sm="8"
      >
        <v-card
          class="elevation-12"
        >
          <v-toolbar
            color="red darken-2"
          >
            <v-toolbar-title
              class="white--text"
            >
              Iniciar sesión
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >
              <v-text-field
                ref="username"
                v-model="username"
                :rules="[() => !!username || 'Este campo es requerido']"
                prepend-icon="mdi-account"
                label="Usuario"
                placeholder="Ingresar tu nombre de usuario"
                required
              />
              <v-text-field
                ref="password"
                v-model="password"
                :rules="[() => !!password || 'Este campo es requerido']"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                label="Contraseña"
                counter
                required
                @keydown.enter="login"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-divider class="mt-5" />
          <v-card-actions>
            <span>
              <a
                style="color: indigo !important;"
                @click.stop="recoverPassword"
              >¿Olvidaste la contraseña?</a>
            </span>
            <v-spacer />
            <v-btn
              align-center
              justify-center
              color="red darken-2"
              @click="login"
            >
              Login
            </v-btn>
          </v-card-actions>
          <v-snackbar
            v-model="snackbar"
            :color="color"
            :bottom="true"
          >
            {{ errorMessages }}
            <v-btn
              dark
              text
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import router from '../../../router'

  export default {
    name: 'DashboardLogin',

    data () {
      return {
        username: '',
        password: '',
        errorMessages: 'Credenciales incorrectas',
        snackbar: false,
        color: 'indigo',
        showPassword: false,
        valid: true,
        lazy: false,
      }
    },
    methods: {
      login: function () {
        if (this.$refs.form.validate()) {
          const username = this.username
          const password = this.password
          this.$store.dispatch('login', { username, password })
            .then(() => {
              switch (localStorage.getItem('role')) {
                case 'ROLE_ADMIN':
                  this.$router.push('/admin/home')
                  break
                case 'ROLE_USER':
                  this.$router.push('/user/home')
                  break
              }
            })
            .catch(err => {
              // eslint-disable-next-line
              console.log(err)
              this.snackbar = true
            },
            )
        }
      },
      recoverPassword: function () {
        router.push({ path: '/recoverpassword' })
      },
    },
  }
</script>
