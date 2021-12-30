<template>
  <div>
    <div class="d-flex" id="card">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="258"
        max-width="443"
        :src="card.flag"
      ></v-img>
      <div class="info" style="background-color: transparent !important;">
        <span>Nome: {{ card.name }}</span>
        <span>Capital: {{ card.capital }}</span>
        <span>Região: {{ card.region }}</span>
        <span>Sub-região: {{ card.subregion }} </span>
        <span>População: {{ card.population }}</span>
        <span
          >Linguas:
          <span
            class="mr-1"
            style="text-decoration: underline; color: blue; cursor: pointer;"
            v-for="(item, index) in card.languages"
            :key="index"
            @click="toLanguage(item.iso639_1)"
            >{{ item.name }};</span
          >
        </span>
      </div>
    </div>
    <div class="flex-column" id="card-responsive">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="198"
        width="100%"
        max-width="296"
        :src="card.flag"
      ></v-img>
      <div class="info" style="background-color: transparent !important;">
        <span>Nome: {{ card.name }}</span>
        <span>Capital: {{ card.capital }}</span>
        <span>Região: {{ card.region }}</span>
        <span>Sub-região: {{ card.subregion }} </span>
        <span>População: {{ card.population }}</span>
        <span>Latitude: {{ card.latlng }}</span>
        <span
          >Linguas:
          <span
            class="mr-1"
            style="text-decoration: underline; color: blue; cursor: pointer;"
            v-for="(item, index) in card.languages"
            :key="index"
            @click="toLanguage(item.iso639_1)"
            >{{ item.name }};</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountryInfo',
  props: {
    card: Object
  },

  methods: {
    toLanguage (language) {
      this.$router.push({ path: '/country', query: { language: language } })
    }
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
  margin-left: 24px;
}

#card-responsive {
  display: none !important;
}

@media screen and (min-width: 320px) and (max-width: 600px) {
  #card {
    display: none !important;
  }

  #card-responsive {
    display: flex !important;
  }

  .info {
    justify-content: space-between;
    height: 242px;
    margin-top: 22px;
    margin-left: 0px;
  }
}
</style>
