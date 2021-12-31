<template>
  <div class="mt-4">
    <h1 class="mb-2" style="color: #006961;">Cadastro</h1>
    <span class="mb-2" style="font-size: 18px; color: #666666;"
      >Por favor, preencha todos os dados corretamente.</span
    >
    <form-register @submit="getUser" />
  </div>
</template>

<script>
import FormRegister from '../components/Form/FormRegister.vue'
export default {
  components: { FormRegister },
}
</script>

<style lang="scss" scoped></style>
