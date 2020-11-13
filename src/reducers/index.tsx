import getRunsReducer from './getRunsSlice'
import getProjectsReducer from './getProjectsSlice'
import loadingReducer from './loadingSlice'

import {combineReducers} from 'redux'

const reducer = combineReducers({
    projects: getProjectsReducer,
    runs: getRunsReducer,
    loading: loadingReducer
})

export default reducer

export type RootState = ReturnType<typeof reducer>