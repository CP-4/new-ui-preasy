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
  },

  getters: {
    loggedIn(state) {
      return state.accessToken != null
    },

    isSetStudentProfile(state) {
      return state.studentProfile != null
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
    }
  },

  actions: {
    logoutUser(context) {
      context.commit('destroyToken')
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
        tempUserId = Math.floor((Math.random() * 1000) + 1);
        context.commit('setTempUserId', tempUserId)
      } else {
        // console.log("old tui");
        tempUserId = this.state.tempUserId
      }
      // console.log(tempUserId);
      axiosBase.post('file2/urlanalytics/trigger', {
        data: "Page Mounted",
        temp_user_id: tempUserId,
      })
    },

    urlanalyticsTrigger(context, payload) {
      // console.log(payload.data);
      var tempUserId = this.state.tempUserId

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
        year_value: payload.year_value,
        phone_value: payload.phone_value
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

  },

  modules: {}
})
