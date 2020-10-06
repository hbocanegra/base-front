<template>
  <v-container
    id="grid"
    fluid
    tag="section"
  >
    <v-row class="text-center">
      <v-col
        cols="12"
        class="pt-0"
      >
        <v-card class="mt-0">
          <v-card-text class="red--text text--darken-4">
            Ha ingresado como {{ roleName }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    name: 'HelloWorldComponent',
    props: {
      role: {
        type: String,
        default: '',
      },
    },
    data: function () {
      return {
        roleName: this.role,
      }
    },
  }
</script>
