import {combineReducers} from 'redux'
import posts from './posts.reducer'
import users from './users.reducer'
import loginStatus from './login.reducer'

export const reducers = combineReducers({ 
    posts,
    users,
    loginStatus
})

