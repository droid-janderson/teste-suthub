<template>
  <div class="d-flex align-center mt-15" style="max-width: 80%;">
    <div style="width: 316px; color: #006961;">
      <label for="filterPerItem" class="ml-3">Países</label>
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
  name: 'FilterGroup',
  data () {
    return {
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
      }
    }
  },

  computed: {
    itemsName () {
      let select = this.select
      let arrayNames = []

      this.cards.map(item => {
        arrayNames.push(item.name)
      })

      return arrayNames
    }
  }
}
</script>

<style>
#filter,
#filterPerItem {
  font-size: 18px;
  padding-left: 25px;
  color: #8d8d8d;
}
</style>
