const signReducer = (state = {
    token: {},
    loading: true,
    error: null,
 
}, action) => {
    switch (action.type) {
        case 'GET_TOKEN':
            console.log("for get reducer",action)
            return { ...state, token: action.token };
        case 'SAVE_TOKEN':
            return { ...state, token: action.token };
        case 'REMOVE_TOKEN':
            return { ...state, token: action.data };
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default     signReducer
 
