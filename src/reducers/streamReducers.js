import _ from 'lodash'
import {
    EDIT_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    DELETE_STREAM
} from '../actions/types';



export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return{
                ...state,
                ..._.mapKeys(action.payload,'id')
            }
        case FETCH_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case CREATE_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case EDIT_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_STREAM:
            return _.omit(state, action.payload)
        default:
            return state;
    }
}
// const streamReducer = (state=[], action) => {
//     switch(action.type){
//         case EDIT_STREAM:
//             return state.map(stream => {
//                 if(stream.id ===action.payload.id){
//                     return action.payload;
//                 }else{
//                     return stream;
//                 }
//             })
//         default:
//             return state;
//     }
// }

// const streamReducers = (state=[], action) => {
//     switch(action.type){
//         case EDIT_STREAM:
//             // const newState = {...state};
//             // newState[action.payload.id] = action.payload
//             // return newState;
//             return{ ...state, [action.payload.id]: action.payload}
//         default:
//             return state;
//     }
// }