import axios from 'axios'

// URL Filmes em Cartaz
//movie/now_playing/?api_key=936ba58f09870b693a4619465e3cea8a&language=pt-BR&page=1

export const key = '936ba58f09870b693a4619465e3cea8a'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export default api