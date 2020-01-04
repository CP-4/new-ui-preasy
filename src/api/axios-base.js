import axios from 'axios'
// import store from '@/store'

const APIUrl = 'http://127.0.0.1:8000'
// const APIUrl = 'https://dev-api-dot-preasy-53c43.appspot.com'
// const APIUrl = 'https://api-dot-preasy-53c43.appspot.com'
// const APIUrl = 'http://192.168.1.104:8000'

const axiosBase = axios.create({
  baseURL: APIUrl,
  // headers: { contentType: 'application/json' }
})

export { axiosBase }
