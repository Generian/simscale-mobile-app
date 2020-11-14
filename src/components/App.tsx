import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './../styles/App.scss'
import RunList, { Run } from "./RunList"
import ButtonAppBar from './AppBar'
import LinearIndeterminate from './LoadingBar'
import axios from 'axios';
import api_config, { base_url } from './../api_config'
import { FETCH_RUNS } from '../reducers/getRunsSlice'
import { LOADING } from '../reducers/loadingSlice'

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS";
axios.defaults.headers.common["Content-Type"] = "application/json";


export const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Get runs
    dispatch({type: LOADING, payload: true})

    axios.get(`${base_url}/projects?limit=500&page=1`, api_config)
    .then((res_p: any) => {
      const projects = res_p.data._embedded
      projects.forEach((project: any) => {
        let url_s = `${base_url}/projects/${project.projectId}/simulations`
        axios.get(url_s, api_config)
          .then((res_s: any) => {
            const simulations = res_s.data._embedded
            simulations.forEach((simulation: any) => {
              let url_sim_details = `${base_url}/projects/${project.projectId}/simulations/${simulation.simulationId}`
              axios.get(url_sim_details, api_config)
                .then((res_sim_details: any) =>{
                  const simulation_details = res_sim_details.data
                  let url_r = `${base_url}/projects/${project.projectId}/simulations/${simulation.simulationId}/runs`
                  axios.get(url_r, api_config)
                    .then((res_r: any) => {
                      const runs = res_r.data._embedded
                      let payload_runs: Run[] = []
                      runs.forEach((run: any) => {
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
                        }
                        payload_runs.push(r)
                      })
                      dispatch({type: FETCH_RUNS, payload: payload_runs})
                    })
                })
            })
          })
      })
    })
    .then(() => {
      dispatch({type: LOADING, payload: false})
    })


    
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