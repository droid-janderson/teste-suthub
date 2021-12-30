<template>
  <div class="mt-4">
    <h1 class="mb-2" style="color: #006961;">Cadastro</h1>
    <span class="mb-2" style="font-size: 18px; color: #666666;">Por favor, preencha todos os dados corretamente.</span>
    <form-register />
  </div>
</template>

<script>
import FormRegister from '../components/Form/FormRegister.vue'
export default {
  components: { FormRegister },
  data () {
    return {
      valid: false,
      user: {
        firstname: '',
        lastname: '',
        date: '',
        cpf: null,
        pet: '',
        breed: '',
        income: '',
        address: {
          cep: null,
          street: '',
          district: '',
          city: '',
          state: '',
        }
      },
      pets: ['cão', 'gato'],
      dogs: ['cão', 'viralata', 'outro'],
      cats: ['cão', 'gato', 'outro'],
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      lastnameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 25 || 'Name must be less than 25 characters'
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
