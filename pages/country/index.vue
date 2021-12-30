<template>
  <div>
    <filter-group class="filter" @getCountry="getData" />
    <filter-group-responsive class="d-flex d-sm-none" @getCountry="getData" />
    <div class="container-cards">
      <country-card
        v-for="card in paginatedItems"
        :key="card.name"
        :card="card"
        @getLanguage="getLanguage"
      />
    </div>

    <div class="container-pagination">
      <v-pagination
        class="pagination"
        color="#006961"
        v-model="pagination.page"
        :length="pagination.total"
        :total-visible="pagination.visible"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import CountryCard from '../../components/Country/CountryCard.vue'
import FilterGroup from '../../components/Filters/FilterGroup.vue'
import FilterGroupResponsive from '../../components/Filters/FilterGroupResponsive.vue'

export default {
  name: 'IndexPage',
  data () {
    return {
      cards: [],
      language: this.$route.query.language,
      pagination: {
        page: 1,
        total: 0,
        perPage: 12,
        visible: 7
      }
    }
  },
  components: {
    FilterGroup,
    CountryCard,
    FilterGroupResponsive
  },
  async mounted () {
    if (this.language) {
      await this.toLanguage()
    } else {
      await this.getAll()
    }
  },
  methods: {
    async getAll () {
      try {
        const response = await this.$axios.$get('/all')

        this.cards = response
        this.pagination.total = Math.ceil(
          this.cards.length / this.pagination.perPage
        )
      } catch (error) {
        throw new Error(error)
      }
    },
    async getData (selectName) {
      try {
        const response = await this.$axios.$get(`/name/${selectName}`)

        this.$router.push({ path: '/country' })

        this.cards = null
        this.cards = response
        this.pagination.total = Math.ceil(
          this.cards.length / this.pagination.perPage
        )
      } catch (error) {
        throw new Error(error)
      }
    },
    async getLanguage (language) {
      try {
        const response = await this.$axios.$get(`/lang/${language}`)

        this.cards = null
        this.cards = response
        this.pagination.total = Math.ceil(
          this.cards.length / this.pagination.perPage
        )
      } catch (error) {
        throw new Error(error)
      }
    },

    async toLanguage () {
      try {
        const response = await this.$axios.$get(`/lang/${this.language}`)

        this.cards = null
        this.cards = response
        this.pagination.total = Math.ceil(
          this.cards.length / this.pagination.perPage
        )
      } catch (error) {
        throw new Error(error)
      }
    },
  },
  computed: {
    paginatedItems () {
      let page = this.pagination.page - 1
      const perPage = this.pagination.perPage
      let start = page * perPage
      let end = start + perPage

      const paginatedItems = this.cards

      return paginatedItems.slice(start, end)
    }
  },
}
</script>

<style scoped>
.container-cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 100%;
  margin-top: 20px;
}

.container-pagination {
  min-width: 100%;
  display: flex;
  justify-content: center;
}

.pagination {
  position: fixed;
  bottom: 0;
  margin-bottom: 20px;
}

@media screen and (min-width: 320px) and (max-width: 600px) {
  .filter {
    display: none !important;
  }
}
</style>
