import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './../styles/App.scss'
import RunList from "./RunList"
import ButtonAppBar from './AppBar'
import LinearIndeterminate from './LoadingBar'
import axios from 'axios'
import api_config, { base_url } from './../api_config'
import { FETCH_RUNS, UPDATE_RUNS } from '../reducers/getRunsSlice'
import { LOADING } from '../reducers/loadingSlice'
import { Run } from './RunListItem'
import { RootState } from '../reducers'

// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS";
// axios.defaults.headers.common["Content-Type"] = "application/json";


export const App = () => {
  const dispatch = useDispatch();

  // const replaceRun = (updatedRun: Run, oldRunsArray: Run[]) => {
  //   let newRunsArray = oldRunsArray
  //   for (var i=0; i < oldRunsArray.length; i++) {
  //       if (oldRunsArray[i].runId === updatedRun.runId) {
  //         newRunsArray[i] = updatedRun
  //       }
  //   }
  //   return newRunsArray
  // }

  // const fetchRunUpdate = () => {
  //   const url_run = `${base_url}/projects/${run.projectId}/simulations/${run.simulationId}/runs/${run.runId}`
  //   axios.get(url_run, api_config)
  //     .then((res_run: any) => {

  //       let r = {
  //         runId: run.runId,
  //         runName: res_run.name,
  //         runCreatedAt: res_run.createdAt,
  //         runStartedAt: res_run.startedAt,
  //         runFinishedAt: res_run.finishedAt,
  //         duration: res_run.duration,
  //         computeResource: res_run.computeResource,
  //         status: res_run.status,
  //         progress: res_run.progress,
  //         simulationId: run.simulationId,
  //         simulationName: run.simulationName,
  //         simulationType: run.simulationType,
  //         projectId: run.projectId,
  //         projectName: run.projectName,
  //         plots: run.plots,
  //       }
  //       dispatch({type: UPDATE_RUNS, payload: replaceRun(r, runs)})
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // const isRunning = run.status == "RUNNING" || run.status == "QUEUED"

  
  useEffect(() => {
    // Get runs
    dispatch({type: LOADING, payload: true})

    // Get projects
    axios.get(`${base_url}/projects?limit=500&page=1`, api_config)
    .then((res_p: any) => {
      const projects = res_p.data._embedded
      projects.forEach((project: any) => {
        let url_s = `${base_url}/projects/${project.projectId}/simulations`

        // Get simulation IDs for project
        axios.get(url_s, api_config)
          .then((res_s: any) => {
            const simulations = res_s.data._embedded
            simulations.forEach((simulation: any) => {
              let url_sim_details = `${base_url}/projects/${project.projectId}/simulations/${simulation.simulationId}`

              // Get simulation details
              axios.get(url_sim_details, api_config)
                .then((res_sim_details: any) =>{
                  const simulation_details = res_sim_details.data
                  let url_r = `${base_url}/projects/${project.projectId}/simulations/${simulation.simulationId}/runs`

                  // Get runs
                  axios.get(url_r, api_config)
                    .then((res_r: any) => {
                      const runs = res_r.data._embedded
                      runs.forEach((run: any) => {

                        // Get plots
                        let url_results = `${base_url}/projects/${project.projectId}/simulations/${simulation.simulationId}/runs/${run.runId}/results`
                        axios.get(url_results, api_config)
                        .then((res_results: any) => {

                          const results = res_results.data._embedded
                          let plots: any[] = []

                          results.forEach((result: any) => {
                            if (result.download.format == 'CSV') {
                              plots.push({
                                type: result.type,
                                category: result.category,
                                url: result.download.url,
                              })
                            }
                          })

                          let r = {
                            runId: run.runId,
                            runName: run.name,
                            runCreatedAt: run.createdAt,
                            runStartedAt: run.startedAt,
                            runFinishedAt: run.finishedAt,
                            duration: run.duration,
                            computeResource: run.computeResource,
                            status: run.status,
                            progress: run.progress,
                            simulationId: simulation.simulationId,
                            simulationName: simulation_details.name,
                            simulationType: simulation_details.model.type,
                            projectId: project.projectId,
                            projectName: project.name,
                            plots: plots,
                          }
                          dispatch({type: FETCH_RUNS, payload: [r]})
                        })
                        .catch((err) => {
                          console.log(err)
                        })
                      })
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                })
                .catch((err) => {
                  console.log(err)
                })
            })
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
    .then(() => {
      dispatch({type: LOADING, payload: false})
    })
    .catch((err) => {
      console.log(err)
    })

    // const interval = setInterval(() => {
    //     if (isRunning) {
    //       const runsState: Run[] = useSelector((state: RootState) => state.runs);
    //       fetchRunUpdate()
    //     }
    // }, 5000);
    // return () => clearInterval(interval);

  }, [])

  return (
    <div className="container container__app">
      <div key="container__header" className="container container__header">
        <ButtonAppBar />
      </div>
      <div key="container__loading" className="container container__loading">
        <LinearIndeterminate />
      </div>
      <div key="container__list" className="container container__list">
        <RunList />
      </div>
    </div>
  )
};