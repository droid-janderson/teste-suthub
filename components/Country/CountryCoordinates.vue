<template>
  <v-col cols="12" md="4">
  <v-card class="mb-8" style="cursor: pointer;" width="316" tile>
    <v-img @click="toCountry()" height="181" :src="card.flag"></v-img>

    <v-card-title>
      {{ card.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ card.region }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" text @click="show = !show">
        Coordenadas Geográficas
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <div
          class="info flex-column"
          style="background-color: transparent !important;"
        >
          <span>Latitude: {{ card.latlng[0] }}</span>
          <span>Longitude: {{ card.latlng[1] }} </span>
        </div>
        <v-divider></v-divider>
        <div class=" d-flex justify-center">
          <v-btn
            @click="toCountry()"
            class="ma-3 mb-2"
            color="#00837e"
            outlined
          >
            Detalhes
          </v-btn>
        </div>
      </div>
    </v-expand-transition>
  </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'CountryCoordinates',
  props: {
    card: Object
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    toCountry () {
      this.$router.push({ path: `/country/${this.card.alpha2Code}` })
    },
  }
}
</script>
<style scoped>
.info {
  min-width: 213px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #454545;
  margin-left: 18px;
}

.info > span {
  margin-top: 10px;
}
</style>
