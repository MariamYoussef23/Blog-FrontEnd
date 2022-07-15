const reducer = (state =[], action) => {
    switch (action.type) {
        case "GET_USERS" :
            return action.payload;
        default:
            return state;
    }

}
export default reducer 