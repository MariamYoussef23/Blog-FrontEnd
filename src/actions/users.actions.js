export const getUsers = (users) => {
    return {
        type: 'GET_USERS' , 
        payload: users
    }
}