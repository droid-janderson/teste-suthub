<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle
            style="font-weight: 500; font-size: 14px; letter-spacing: 1px;"
          >
            MENU
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="#006961">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      class="hidden-sm-and-down"
      fixed
      app
      height="60"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <back-button class="mr-6" />
    </v-app-bar>
    <v-app-bar
      :clipped-left="clipped"
      class="hidden-xs-and-down"
      fixed
      app
      height="70"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <div>
        <NuxtLink to="/"
          ><img
            src="../assets/logo/Logo-suthub.png"
            alt="Logo SutHub"
            width="120"
            class="mr-4 mt-1"
        /></NuxtLink>
      </div>
      <v-spacer />
      <back-button />
    </v-app-bar>
  </div>
</template>

<script>
import BackButton from './Buttons/BackButton.vue'

export default {
  name: 'Header',
  components: {
    BackButton
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-account-plus',
          title: 'Cadastro',
          to: '/'
        },
        {
          icon: 'mdi-flag-variant',
          title: 'Brasil',
          to: '/brazil'
        },
        {
          icon: 'mdi-earth-box',
          title: 'Regiões',
          to: '/region'
        },
        {
          icon: 'mdi-earth',
          title: 'Países',
          to: '/country'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SUTHUB'
    }
  }
}
</script>
