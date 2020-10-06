<template>
  <v-container
    id="unauthorized"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
        sm="8"
      >
        <span>Sección no autorizada para su perfil de usuario.</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    name: 'Unauthorized',

    data () {
      return {}
    },
  }
</script>
