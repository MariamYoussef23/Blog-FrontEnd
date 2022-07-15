const reducer = (state = false, action ) => {
    switch(action.type) {
        case 'LOGIN_STATUS' : 
            return !action.payload;
        default : 
            return state;
    }
}

export default reducer