<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="4"
    >
      <h3>You are logged out</h3>
    </v-col>
  </v-row>
</template>

<script>
  import bus from '../../../../main'
  export default {
    data () {
      return {
        username: null,
        password: null,
      }
    },
    created () {
      bus.$emit('logout')
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
      })
    },
  }
</script>
