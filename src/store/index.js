import Vue from 'vue'
import Vuex from 'vuex'
import {
  axiosBase
} from '@/api/axios-base'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    APIData: '',
    tempUserId: localStorage.getItem('temp_user_id') || null,
    studentProfile: localStorage.getItem('student_profile') || null,
    promoCode: localStorage.getItem('promo_code') || null,
    shopId: localStorage.getItem('shop_id') || null,
    shop: null
  },

  getters: {
    loggedIn(state) {
      return state.accessToken != null
    },

    isSetStudentProfile(state) {
      return state.studentProfile != null
    },

    getPromoCode(state) {
      return state.promoCode;
    },

    getShopId(state) {
      return state.shopId;
    },

    getShop(state) {
      return state.shop;
    }
  },

  mutations: {
    destroyToken(state) {
      localStorage.removeItem('access_token');
      state.accessToken = null;
    },

    retrieveToken(state, token) {
      localStorage.setItem('access_token', token);
      state.accessToken = token;
    },

    setTempUserId(state, temp_user_id) {
      localStorage.setItem('temp_user_id', temp_user_id);
      state.tempUserId = temp_user_id;
    },

    setStudentProfile(state) {
      localStorage.setItem('student_profile', 'updated');
      state.studentProfile = 'updated';
    },

    destroyStudentProfile(state) {
      localStorage.removeItem('student_profile');
      state.studentProfile = null;
    },

    setPromoCode(state, promoCode) {
      localStorage.setItem('promo_code', promoCode);
      state.promoCode = promoCode;
    },

    setShopId(state, shop) {
      localStorage.setItem('shop_id', shop.id);
      state.shopId = shop.id;
      state.shop = shop;
    },

    destroyShopId(state) {
      localStorage.removeItem('shop_id');
      state.shopId = null;
      state.shop = null;
    },
  },

  actions: {
    logoutUser(context) {
      context.commit('destroyToken')
      context.commit('destroyStudentProfile')
    },

    loginUser(context, credentials) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/file2/auth/login/', {
            email: credentials.email,
            password: credentials.password
          })
          .then(response => {
            const token = response.data.token;
            context.commit('retrieveToken', token);
            resolve(response);
          })
          .catch(error => {
            // console.log(error);
            reject(error)
          })
      })
    },

    registerUser(context, credentials) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/file2/auth/register/', {
            student_name: credentials.student_name,
            email: credentials.email,
            phone: credentials.phone,
            password: credentials.password
          })
          .then(response => {
            const token = response.data.token;
            context.commit('retrieveToken', token);
            resolve(response);
          })
          .catch(error => {
            // console.log(error);
            reject(error)
          })
      })
    },

    urlanalyticsLinkOpen(context) {
      var tempUserId;
      if (this.state.tempUserId == null) {
        // console.log("new tui");
        tempUserId = Math.floor((Math.random() * 10000) + 1);
        context.commit('setTempUserId', tempUserId)
        axiosBase.post('file2/urlanalytics/trigger', {
          data: "App Mounted",
          temp_user_id: tempUserId,
        })
      } else {
        // console.log("old tui");
        tempUserId = this.state.tempUserId
      }
      // console.log(tempUserId);
    },

    urlanalyticsTrigger(context, payload) {
      // console.log(payload.data);
      // var tempUserId = this.state.tempUserId
      var tempUserId;
      if (this.state.tempUserId == null) {
        // console.log("new tui");
        tempUserId = Math.floor((Math.random() * 10000) + 1);
        context.commit('setTempUserId', tempUserId)
      } else {
        // console.log("old tui");
        tempUserId = this.state.tempUserId
      }
      if(this.getters.loggedIn) {
        axiosBase.post('file2/urlanalytics/trigger', {
          data: payload,
          temp_user_id: tempUserId,
        }, {
          headers: {
            'Authorization': "bearer " + this.state.accessToken
          }
        })
      } else {
        axiosBase.post('file2/urlanalytics/trigger', {
          data: payload,
          temp_user_id: tempUserId,
        })
      }

    },

    studyMaterialPrint(context, payload) {
      // var tempUserId = this.state.tempUserId
      axiosBase.post('file2/studymaterial/print', {
        user_name: payload.userName,
        user_phone: payload.userPhone,
        user_branch: payload.userBranch
      })
    },

    updateSturentProfile(context, payload) {
      console.log(payload);
      axiosBase.post('file2/profile/update', {
        clg_value: payload.clg_value,
        branch_value: payload.branch_value,
        year_value: payload.year_value
      }, {
        headers: {
          'Authorization': "bearer " + this.state.accessToken
        }
      }).then(() => {
        if (this.state.studentProfile == null) {
          context.commit('setStudentProfile')
        }
      })
      .catch(error => console.log(error))
    },

    updatePrmoCode(context, payload) {
      console.log(payload);
      context.commit('setPromoCode', payload)

    },

    updateShopId(context, shop) {
      context.commit('setShopId', shop)
    },

    clearShopId(context) {
      context.commit('destroyShopId');
    }
  },

  modules: {}
})
