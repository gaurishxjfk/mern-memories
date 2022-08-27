import { FETCH, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, STOP_LOADING, FETCH_BY_ID, REDIRECT_TO_HOME, COMMENT, START_LOADING_POST, STOP_LOADING_POST } from '../constants/actionTypes'
export default (state = { isLoading: true, isLoadingPost: true, posts: [] },action) => {
    switch (action.type) {        
        case FETCH :
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                redirectToHome: false
            };
        case FETCH_BY_SEARCH :
            return {
                ...state,
                posts: action.payload,
                redirectToHome: false
            };
        case FETCH_BY_ID :
            return {
                ...state,
                post: action.payload,
                redirectToHome: false
            }
        case CREATE :
            return { ...state, posts: [...state, action.payload], redirectToHome: false }
        case UPDATE :
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post), redirectToHome: false }
        case DELETE :
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload), redirectToHome: false};
        case COMMENT :
            return { ...state,
                    posts: state.posts.map((post) => {
                        if(post._id === action.payload._id){
                            return action.payload
                        }
                        return post
                    })
                }
        case START_LOADING :
            return { ...state, isLoading: true };
        case STOP_LOADING :
            return { ...state, isLoading: false} ;
        case START_LOADING_POST :
            return { ...state, isLoadingPost: true };
        case STOP_LOADING_POST :
            return { ...state, isLoadingPost: false} ;
        case REDIRECT_TO_HOME :
            return { ...state, redirectToHome: true }
        default:
            return state;
    }
}