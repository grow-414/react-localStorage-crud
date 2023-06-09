import { USER_LIST } from "../actions";

const initialState = {
    users: []
}

const userReducers = (state = initialState, action) =>{
    switch(action.type){
        case USER_LIST:
            return {
                ...state,
                users: action.payload
            }
        default: 
            return state;
    }
}

export default userReducers;