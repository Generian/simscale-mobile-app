import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import { Run } from './components/RunListItem';

// DEFAULT STATE
interface defaultState {
  runs: Run[],
  loading: boolean,
}

// Default plot
const defaultPlot1 = {
  type: "DOMAIN",
  category: "CONVERGENCE_PLOT",
  url: "https://www.simscale.com/",
}

const defaultPlot2 = {
  type: "FIELD",
  category: "CONVERGENCE_PLOT",
  url: "https://www.simscale.com/",
}

// Default run
const defaultRun: Run = {
  runId: "0123456789",
  runName: "Placeholder",
  runCreatedAt: "2020-01-01T00:00:00Z",
  runStartedAt: "2020-01-01T00:00:00Z", 
  runFinishedAt: "2020-01-01T00:00:00Z", 
  duration: 13100, 
  computeResource: { 
    type: "CPU_HOURS",
    value: 10.12234
  }, 
  status: "ERROR",
  progress: 1, 
  simulationId: "0123456789", 
  simulationName: "Placeholder",
  simulationType: "STATIC_ANALYSIS",
  projectId: "0123456789", 
  projectName: "Some very very long project name project name", 
  plots: [defaultPlot1, defaultPlot2],
}

const defaultState: defaultState = {
  runs: [
    defaultRun,
  ],
  loading: true
}

// MIDDLEWARE
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// STORE
const store = createStore(reducer, defaultState, composedEnhancer)

export default store