import axios from 'axios'
const Api =axios.create({baseURL:"https://rs-mern.herokuapp.com/"})
export const login=(data)=>Api.post('/auth/login',data)
export const signup=(data)=>Api.post('/auth/register',data)