import getRunsReducer from './getRunsSlice'

import {combineReducers} from 'redux'

const reducer = combineReducers({
    runs: getRunsReducer
})

export default reducer

export type RootState = ReturnType<typeof reducer>