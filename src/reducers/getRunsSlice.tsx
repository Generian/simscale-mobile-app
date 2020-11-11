import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '.'

const initialState: any[] = []

// Thunk function
// export const fetchRuns = async (dispatch: (arg0: { type: string; payload: any }) => void, getState: any) => {
//   const response = await axios.get(`http://jsonplaceholder.typicode.com/users`)
//   dispatch({ type: 'todos/todosLoaded', payload: response.data })
// }

export async function fetchRuns(dispatch: <AnyAction>(action: AnyAction) => AnyAction) {
  const response = await axios.get(`http://jsonplaceholder.typicode.com/users`)
  dispatch({ type: 'GET_RUNS', payload: response.data })
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>

export const fetchRuns2 = (): ThunkAction<void, RootState, unknown, any> => async dispatch => {
  const response = await axios.get(`http://jsonplaceholder.typicode.com/users`)
  dispatch({ type: 'todos/todosLoaded', payload: response.data })
}

const getRunsReducer = (state: string[] = initialState, action: { type: string; }) => {
    switch(action.type) {
        case 'GET_RUNS':
            return state.push("test")
        default:
            return state
    }
}

export default getRunsReducer;