<template>
  <div>
    <filter-region class="filter " @getCountry="getData" />
    <filter-region-responsive class="d-flex d-sm-none" @getCountry="getData" />
    <div class="container-cards">
      <country-coordinates
        v-for="(card, index) in paginatedItems"
        :key="index"
        :card="card"
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
import FilterRegion from '../../components/Filters/FilterRegion.vue'
import CountryCoordinates from '../../components/Country/CountryCoordinates.vue'
import FilterRegionResponsive from '../../components/Filters/FilterRegionResponsive.vue'

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
    FilterRegion,
    CountryCoordinates,
    FilterRegionResponsive
  },
  async mounted () {
    await this.getAll()
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
        const response = await this.$axios.$get(`/region/${selectName}`)
        console.log(response);

        this.$router.push({ path: '/region' })

        this.cards = null
        this.cards = response
        this.pagination.total = Math.ceil(
          this.cards.length / this.pagination.perPage
        )
      } catch (error) {
        throw new Error(error)
      }
    }
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
  }
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
