export const FETCH_RUNS = 'FETCH_RUNS'

const getRunsReducer = (state: any[] = [], action: { type: string; payload: any[]}) => {
    switch(action.type) {
        case FETCH_RUNS:
            return [...state, ...action.payload]
        default:
            return state
    }
}

export default getRunsReducer;