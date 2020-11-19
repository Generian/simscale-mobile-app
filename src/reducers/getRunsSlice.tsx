export const FETCH_RUNS = 'FETCH_RUNS'
export const UPDATE_RUNS = 'UPDATE_RUNS'

const getRunsReducer = (state: any[] = [], action: { type: string; payload: any[]}) => {
    switch(action.type) {
        case FETCH_RUNS:
            return [...state, ...action.payload]
        case UPDATE_RUNS:
            return [...action.payload]
        default:
            return state
    }
}

export default getRunsReducer;