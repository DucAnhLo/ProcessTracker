export const  AuthReducer = (state, action) => {
    switch(action.type){
        case 'SET_AUTH':
            return {
                ...state, 
                
            }
        default:
            return state
    }
}