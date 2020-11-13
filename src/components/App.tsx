import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './../styles/App.scss';
import RunList, { Run } from "./RunList";
import axios from 'axios';
import api_config from './../api_config'
import { FETCH_PROJECTS } from '../reducers/getProjectsSlice';
import { FETCH_RUNS } from '../reducers/getRunsSlice';
import { LOADING } from '../reducers/loadingSlice';

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS";
axios.defaults.headers.common["Content-Type"] = "application/json";


export const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log("fetch the runs");

    // Get projects
    //   axios.get('https://api-dev.simscale.com/v0/projects?limit=500&page=1', {
    //     headers: {
    //         ["x-api-key"]: 'fe517ff4-acd4-4586-bc61-ab68f1f70067',
    //     }
    // })
      // .then((res:any) => {
      //   console.log(res)
      //   dispatch({type: FETCH_PROJECTS, payload: res._embedded})
      // })

    // Get runs
    dispatch({type: LOADING, payload: true})
    console.log("test")

    axios.get('https://api-dev.simscale.com/v0/projects?limit=500&page=1', api_config)
    .then((res_p:any) => {
      const projects = res_p.data._embedded
      console.log(res_p)
      projects.forEach((project: any) => {
        let url_s = `https://api-dev.simscale.com/v0/projects/${project.projectId}/simulations`
        axios.get(url_s, api_config)
          .then((res_s:any) => {
            const simulations = res_s.data._embedded
            simulations.forEach((simulation: any) => {
              let url_r = `https://api-dev.simscale.com/v0/projects/${project.projectId}/simulations/${simulation.simulationId}/runs`
              axios.get(url_r, api_config)
                .then((res_r:any) => {
                  const runs = res_r.data._embedded
                  let payload_runs: Run[] = []
                  runs.forEach((run:any) => {
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
    .then(() => {
      dispatch({type: LOADING, payload: false})
    })


    
  }, [])

  return (
    <div className="container container__app">
    <RunList />
  </div>
  )
};