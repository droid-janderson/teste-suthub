<template>
  <v-form v-model="valid">
    <v-stepper alt-labels v-model="position">
      <v-stepper-header>
        <v-stepper-step :complete="position > 1" step="1">
          Geral
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="position > 2" step="2">
          Endereço
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Pet
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="user.firstname"
                :counter="10"
                label="Nome*"
                placeholder="Primeiro nome..."
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.lastname"
                :counter="25"
                label="Sobrenome*"
                placeholder="Sobrenome..."
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-mask="'##/##/####'"
                v-model="user.date"
                label="Data de Nascimento*"
                placeholder="DD/MM/AAAA"
                persistent-hint
                prepend-inner-icon="mdi-calendar"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-mask="'###.###.###-##'"
                v-model="user.cpf"
                label="CPF*"
                placeholder="000.000.000-00"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-money="money"
                v-model.lazy="user.income"
                label="Renda mensal*"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn @click="position = 2" class="ma-2" outlined color="#006961">
            Próximo
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field
                v-mask="'#####-###'"
                v-model="cepValidate"
                label="CEP*"
                placeholder="00000-000"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.address.street"
                label="Rua*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.address.district"
                label="Bairro*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.address.city"
                label="Cidade*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-text-field
                v-mask="'XX'"
                v-model="user.address.state"
                label="Estado*"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn @click="position = 1" class="ma-2" outlined color="#666666">
            Voltar
          </v-btn>

          <v-btn @click="position = 3" class="ma-2" outlined color="#006961">
            Próximo
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row>
            <v-col class="d-flex" cols="12" sm="2">
              <v-select
                v-model="user.pet"
                :items="pets"
                label="Pet*"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="user.pet" class="d-flex" cols="12" sm="3">
              <v-select
                v-if="user.pet == 'cão'"
                v-model="user.breed"
                :items="dogs"
                required
                label="Raça*"
              ></v-select>
              <v-select
                v-else
                v-model="user.breed"
                :items="cats"
                required
                label="Raça*"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3" v-if="user.breed == 'outro'">
              <v-text-field
                v-model="user.outro"
                label="Outro*"
                placeholder="nome da raça..."
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn @click="position = 2" class="ma-2" outlined color="#666666">
            Voltar
          </v-btn>
          <v-btn
            class="ma-2"
            color="#00837e"
            style="color: #fff; font-weight: 400;"
            @click="onSubmit()"
          >
            Enviar
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { VMoney } from 'v-money'
import { cpf } from 'cpf-cnpj-validator'

export default {
  name: 'FormRegister',
  setup: () => ({ v$: useVuelidate() }),
  data () {
    return {
      valid: false,
      position: 1,
      firstname: '',
      user: {
        lastname: '',
        date: '',
        cpf: null,
        income: 100000,
        pet: '',
        breed: '',
        address: {
          cep: null,
          street: '',
          district: '',
          city: '',
          state: ''
        }
      },
      cepValidate: null,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
      pets: ['cão', 'gato'],
      dogs: [
        'Shih Tzu',
        'Rottweiler',
        'Pastor Alemão',
        'PitBull',
        'SRD (Sem Raça Definida)',
        'outro'
      ],
      cats: ['Persa', 'Siamês', 'Maine Coon', 'Siberiano', 'Serval', 'outro']
    }
  },
  validations () {
    return {
      user: {
        firstname: { minLength: minLength(3), required },
        lastname: { required }
      }
    }
  },

  directives: { money: VMoney },

  methods: {
    async onSubmit () {
      localStorage.setItem('user', JSON.stringify(this.user))

      try {
        const user = localStorage.getItem('user')
        console.log(JSON.parse(user))
      } catch (error) {
        throw new Error(error)
      }
    }
  },

  watch: {
    async cepValidate () {
      if (this.cepValidate.length == 9) {
        const response = await this.$axios.get(
          `https://viacep.com.br/ws/${this.cepValidate}/json/`
        )

        const adress = response.data

        this.user.address.cep = adress.cep
        this.user.address.street = adress.logradouro
        this.user.address.district = adress.bairro
        this.user.address.city = adress.localidade
        this.user.address.state = adress.uf
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
