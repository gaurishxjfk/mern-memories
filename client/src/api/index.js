import axios from 'axios'

const API = axios.create({ baseURL: 'https://mern-memories-puce.vercel.app' }) // http://localhost:5009

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        let token = JSON.parse(localStorage.getItem('profile')).token 
                    ? JSON.parse(localStorage.getItem('profile')).token 
                    : localStorage.getItem('profile')
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const fetchPostById = (id) => API.get(`${'/posts'}/${id}`);
export const createPost = (postData) => API.post('/posts/', postData);
export const updatePost = (id, updatedPost) => API.patch(`${'/posts'}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${'/posts'}/${id}`, deletePost);
export const likePost = (id, updatedPost) => API.patch(`${'/posts'}/${id}/likepost`, updatedPost);
export const commentPost = (comment, id) => API.post(`${'/posts'}/${id}/commentPost`, {comment});

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);