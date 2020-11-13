export const FETCH_PROJECTS = 'FETCH_PROJECTS'

const getProjectsReducer = (state: any[] = [], action: { type: string; payload: any[]}) => {
    switch(action.type) {
        case FETCH_PROJECTS:
            return [...state, ...action.payload]
        default:
            return state
    }
}

export default getProjectsReducer;