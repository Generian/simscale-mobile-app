export const LOADING = 'LOADING'

const loadingReducer = (state: boolean = false, action: { type: string; payload: boolean}) => {
    switch(action.type) {
        case LOADING:
            return action.payload
        default:
            return state
    }
}

export default loadingReducer;