import getRunsReducer from './getRunsSlice'
import loadingReducer from './loadingSlice'

import {combineReducers} from 'redux'

const reducer = combineReducers({
    runs: getRunsReducer,
    loading: loadingReducer
})

export default reducer

export type RootState = ReturnType<typeof reducer>