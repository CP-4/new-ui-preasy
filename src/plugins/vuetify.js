import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  iconfont: 'md',
  themes: {
    light: {
      primary: '#9652ff',
      success: '#3cd1c2',
      info: '#ffaa2c',
      error: '#f83e70',
    },
    dark: {
      primary: '#9652ff',
      success: '#3cd1c2',
      info: '#ffaa2c',
      error: '#f83e70',
    },
  }
});
