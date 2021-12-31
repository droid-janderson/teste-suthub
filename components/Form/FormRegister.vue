<template>
  <v-form>
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
                v-model="user.firstName"
                :counter="10"
                label="Nome*"
                placeholder="Primeiro nome..."
              ></v-text-field>
              <div class="error" v-if="!$v.user.firstName.required">
                Campo obrigatório
              </div>
              <div class="error" v-if="!$v.user.firstName.minLength">
                Mínimo de 4 letras.
              </div>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.lastName"
                :counter="25"
                label="Sobrenome*"
                placeholder="Sobrenome..."
                required
              ></v-text-field>
              <div class="error" v-if="!$v.user.lastName.required">
                Campo obrigatório
              </div>
              <div class="error" v-if="!$v.user.lastName.minLength">
                Mínimo de 4 letras.
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-mask="'##/##/####'"
                v-model="date"
                label="Data de Nascimento*"
                placeholder="DD/MM/AAAA"
                persistent-hint
                prepend-inner-icon="mdi-calendar"
                required
              ></v-text-field>
              <div class="error" v-if="!$v.user.age.required">
                Campo obrigatório
              </div>
              <div class="error" v-if="!$v.user.age.between">
                Você tem que ter mais de 18 e ter menos de 65;
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-mask="'###.###.###-##'"
                v-model="cpfData"
                label="CPF*"
                placeholder="000.000.000-00"
                required
              ></v-text-field>
              <div class="error" v-if="!$v.user.cpf.required">
                Campo obrigatório
              </div>
              <div v-if="cpfValidation == false" class="error">
                CPF Inválido!
              </div>
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
              <div class="error" v-if="!$v.user.address.cep.required">
                Campo obrigatório
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.address.street"
                label="Rua*"
                required
              ></v-text-field>
              <div class="error" v-if="!$v.user.address.street.required">
                Campo obrigatório
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.address.district"
                label="Bairro*"
                required
              ></v-text-field>
              <div class="error" v-if="!$v.user.address.district.required">
                Campo obrigatório
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="user.address.city"
                label="Cidade*"
                required
              ></v-text-field>
              <div class="error" v-if="!$v.user.address.city.required">
                Campo obrigatório
              </div>
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
                v-model="user.other"
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
import {
  required,
  minLength,
  between,
  minValue
} from 'vuelidate/lib/validators'
import { VMoney } from 'v-money'
import { cpf } from 'cpf-cnpj-validator'

export default {
  name: 'FormRegister',
  setup: () => ({ v$: useVuelidate() }),
  data () {
    return {
      position: 1,
      user: {
        firstName: '',
        lastName: '',
        age: '',
        cpf: null,
        income: 100000,
        pet: '',
        breed: '',
        other: '',
        address: {
          cep: null,
          street: '',
          district: '',
          city: '',
          state: ''
        }
      },
      cpfData: null,
      cpfValidation: null,
      date: '',
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

  validations: {
    user: {
      firstName: {
        required,
        minLength: minLength(4)
      },
      lastName: {
        required,
        minLength: minLength(4)
      },
      age: {
        required,
        between: between(18, 65)
      },
      cpf: {
        required
      },
      income: {
        required,
        minValue: minValue(1000)
      },
      pet: {
        required
      },
      breed: {
        required
      },
      address: {
        cep: {
          required
        },
        street: {
          required
        },
        district: {
          required
        },
        city: {
          required
        },
        state: {
          required
        }
      }
    }
  },

  directives: { money: VMoney },

  methods: {
    async onSubmit () {
      alert(
        `
        name: ${this.user.firstName} ${this.user.lastName},
        idade: ${this.user.age},
        CPF: ${this.user.cpf},
        Renda Salarial: ${this.user.income},
        Pet: ${this.user.pet},
        Raça do pet: ${this.user.breed},
        Cep: ${this.user.address.cep},
        Rua: ${this.user.address.street},
        Bairro: ${this.user.address.district},
        Cidade: ${this.user.address.city} (${this.user.address.state})
        `
      )
    }
  },

  watch: {
    cpfData () {
      this.cpfValidation = cpf.isValid(this.cpfData)

      if (!this.cpfValidation) {
        return
      } else {
        this.user.cpf = this.cpfData
      }
    },
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
    },
    date () {
      if (this.date.length < 10) {
        return
      }

      let day = this.date.split('/')[0]
      let month = this.date.split('/')[1]
      let year = this.date.split('/')[2]

      let date = new Date()
      let yearNow = date.getFullYear()
      let monthNow = date.getMonth() + 1
      let dayNow = date.getDate()
      year = +year
      month = +month
      day = +day
      this.user.age = yearNow - year

      if (monthNow < month || (monthNow == month && dayNow < day)) {
        this.user.age--
      }

      this.user.age = this.user.age < 0 ? 0 : this.user.age

      if (this.user.age < 18 || this.user.age > 65) {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.valid {
  border-color: #5a5;
  background: #efe;
}

.valid:focus {
  outline-color: #8e8;
}
</style>
