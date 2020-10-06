<template>
  <v-dialog
    v-model="$store.state.loader"
    persistent
    width="500"
  >
    <div class="text-center transparent">
      <v-progress-circular
        :size="50"
        :width="7"
        color="indigo"
        indeterminate
      />
    </div>
  </v-dialog>
</template>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
