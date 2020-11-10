const getRunsReducer = (state: string[] = ["check"], action: { type: string; }) => {
    switch(action.type) {
        case 'GET_RUNS':
            return state.push("test")
        default:
            return state
    }
}

export default getRunsReducer;