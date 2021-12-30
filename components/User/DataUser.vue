<template>
  <div>
    <span>{{user.firstname}}</span>
  </div>
</template>

<script>
export default {
  name: 'DataUser',
  data () {
    return {
      user: null
    }
  },
  mounted () {
    const response = localStorage.getItem('user')

    this.user = JSON.parse(response)
  }
}
</script>

<style lang="scss" scoped></style>
