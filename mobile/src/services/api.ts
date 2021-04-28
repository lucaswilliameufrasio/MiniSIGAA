import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://university-arch-and-perform.herokuapp.com/api'
})
