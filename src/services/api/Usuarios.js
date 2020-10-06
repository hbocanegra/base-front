import axios from 'axios'

export function getUsuarioByEmail (email) {
  return axios.get('/usuarios?email=' + email)
  .then(response => {
    return response.data
  })
}

export function updateUsuario (id, usuario) {
  return axios.put('/usuarios/' + id, usuario)
  .then(response => {
      return response.data
    })
}

export function getAllUsers () {
  const email = localStorage.getItem('user')
  return axios.post('/usuarios/all', { email: email })
  .then(response => {
    return response.data
  })
}

export function getAllNotarios () {
  return axios.get('/usuarios/notarios')
  .then(response => {
    return response.data
  })
}

export default {
  getUsuarioByEmail,
  updateUsuario,
  getAllUsers,
  getAllNotarios,
}
