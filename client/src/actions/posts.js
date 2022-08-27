import * as api from '../api';
import {
    FETCH,
    CREATE,
    UPDATE,
    DELETE,
    FETCH_BY_SEARCH,
    START_LOADING,
    STOP_LOADING,
    FETCH_BY_ID,
    REDIRECT_TO_HOME,
    COMMENT,
    STOP_LOADING_POST,
    START_LOADING_POST
} from '../constants/actionTypes'

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH, payload: data})
        dispatch({ type: STOP_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostBySearch(searchQuery)
        dispatch({ type: FETCH_BY_SEARCH, payload: data})
        dispatch({ type: STOP_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}

export const getPostsById= (postId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_POST })
        const { data } = await api.fetchPostById(postId)
        dispatch({ type: FETCH_BY_ID, payload: data})
        dispatch({ type: STOP_LOADING_POST })
    } catch (error) {
        dispatch({ type: REDIRECT_TO_HOME })
        console.log(error.message)
    }
}

export const createPost = (post,navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createPost(post)
        navigate(`/posts/${window.btoa(data._id)}`)
        dispatch({ type: CREATE, payload: data})
        dispatch({ type: STOP_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id})
    } catch (error) {
        console.log(error.message)
    }
}
export const likePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id, post)
        dispatch({ type: UPDATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const commentPost = (comment, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(comment, id)
        
        dispatch({ type: COMMENT, payload: data})
        return data.comments
    } catch (error) {
        console.log(error.message)
    }
}