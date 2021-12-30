<template>
  <div class="d-flex flex-column justify-content-between align-center mt-4" style="min-height: 100px">
    <div style="width: 220px; color: #006961;">
      <label for="filterPerItem" class="ml-3">Regiões</label>
      <v-autocomplete
        id="filterPerItem"
        :items="itemsName"
        v-model="selectName"
        style="margin: 0; padding: 0;"
        placeholder="Escolha uma opção"
      ></v-autocomplete>
    </div>
    <v-spacer />
    <v-btn
      width="156px"
      elevation="2"
      color="#00837e"
      style="color: #fff; font-weight: 400; border-radius: 10px;"
      @click="getCountry()"
      >Pesquisar</v-btn
    >
  </div>
</template>

<script>
export default {
  name: 'FilterRegionResponsive',
  data () {
    return {
      select: null,
      selected: null,
      selectName: null,
      cards: []
    }
  },

  emits: ['getCountry'],

  async mounted () {
    await this.getRegion()
  },
  methods: {
    async getRegion () {
      try {
        const response = await this.$axios.$get('/all')

        this.cards = response
      } catch (error) {
        throw new Error(error)
      }
    },

    getCountry () {
      if (!this.selectName) {
        return
      } else {
        this.$emit('getCountry', this.selectName)
        console.log(this.cards);
      }
    }
  },

  computed: {
    itemsName () {
      let arrayNames = []

      this.cards.map(item => {
        arrayNames.push(item.region)
        this.selected = 'region'
      })

      return arrayNames
    }
  }
}
</script>

<style>
#filterPerItem {
  font-size: 18px;
  padding-left: 25px;
  color: #8d8d8d;
}
</style>
