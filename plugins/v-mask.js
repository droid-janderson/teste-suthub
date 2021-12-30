import Vue from 'vue'
import vueMask from 'v-mask';
import vueMoney from 'v-money';

Vue.use(vueMask);
Vue.use(vueMoney, { precision: 2 });
