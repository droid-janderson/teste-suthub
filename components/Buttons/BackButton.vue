<template>
  <div>
    <v-btn
      elevation="2"
      width="136"
      class="font-weight-regular text-capitalize hidden-sm-and-down"
      outlined
      tile
      color="#006961"
      @click="toHome()"
    >
      <v-icon color="#006961" v-bind="attrs" v-on="on" class="mr-3">
        mdi-home
      </v-icon>
      Home
    </v-btn>
    <v-btn
      elevation="0"
      width="40"
      class="font-weight-regular text-capitalize hidden-sm-and-up"
      @click="toHome"
    >
      <v-icon color="#006961" v-bind="attrs" v-on="on">
        mdi-home
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'BackButton',
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
