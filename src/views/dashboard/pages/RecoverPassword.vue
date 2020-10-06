<template>
  <v-container
    id="recoverPassword"
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
            color="indigo"
          >
            <v-toolbar-title
              class="white--text"
            >
              Recuperar la Contraseña
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
            </v-form>
          </v-card-text>
          <v-divider class="mt-5" />
          <v-card-actions>
            <v-btn
              align-center
              justify-center
              color="grey"
              to="login"
            >
              Regresar
            </v-btn>
            <v-spacer />
            <v-btn
              align-center
              justify-center
              color="indigo"
              @click="recoverPassword"
            >
              Enviar
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

  export default {
    name: 'RecoverPassword',

    data () {
      return {
        username: '',
        errorMessages: 'Usuario Incorrecto',
        snackbar: false,
        color: 'indigo',
        valid: true,
        lazy: false,
      }
    },
    methods: {
      recoverPassword: function () {
        if (this.$refs.form.validate()) {
          const username = this.username
          this.$store.dispatch('recoverPassword', { username })
            .then(response => {
              this.errorMessages = response.message
              this.snackbar = true
              this.color = 'success'
            })
            .catch(err => {
              // eslint-disable-next-line
              console.log(err)
              this.snackbar = true
              this.color = 'error'
            },
            )
        }
      },
    },
  }
</script>
