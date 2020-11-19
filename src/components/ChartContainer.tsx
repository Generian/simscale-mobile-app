import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Plot from './Chart'
import axios from 'axios'
import Papa from 'papaparse'
import api_config from './../api_config'

// Default plot //TODO: Remove default plot
const generateData = (start: number, end: number, step: number, m: string) => {
    const data: PlotDataPoint[] = []
    for (let i = start; i < end; i += step) {
        const v = m == "cos" ? Math.cos(i) : Math.sin(i)
        data.push({ value: v / i, argument: i })
    }
    return data
}

const searchUrl = (category: string, array: Plot[]) => {
    let url = ""
    for (let i=0; i< array.length; i++) {
        if (array[i].category === category) {
            url = array[i].url as string 
        }
    }

    return url
}

export interface Plot {
    type: string,
    category: string,
    url: string,
}

export interface PlotDataPoint {
    argument: number,
    value: number,
}

export interface PlotData {
    [key: string]: PlotDataPoint[],
}

export interface ChartContainerProps {
    plots: Plot[],
}

const EMPTY_STRING: string = ""
const DEFAULT_LIST: string[] = []
const DEFAULT_DATA: PlotData = {}
const DEFAULT_PLOT: JSX.Element = <></>

const ChartContainer = (props: ChartContainerProps) => {
    let isMounted: boolean = false

    const [categoryList, setCategoryList] = useState(DEFAULT_LIST)
    const [category, setCategory] = useState(EMPTY_STRING)
    const [fieldList, setFieldList] = useState(DEFAULT_LIST)
    const [field, setField] = useState(EMPTY_STRING)
    const [data, setData] = useState(DEFAULT_DATA)
    const [plot, setPlot] = useState(DEFAULT_PLOT)

    const getData = (url: string) => {
        // const d: PlotData = {
        //     Placeholder: generateData(1, 10, 1, "cos"),
        //     Placeholder2: generateData(1, 1000, 1, "sin"),
        // }

        // const fl = ["Placeholder", "Placeholder2"]
        // setData(d)
        // setFieldList(fl)
        // setField(fl[0])
        // const p: JSX.Element | null = <Plot data={d[fl[0]]}/>
        // setPlot(p)

        axios.get(url, api_config)
            .then((plot: any) => {
                // Empty object to get final plot data pushed into it
                let data: PlotData = {}
                console.log("fetched data from: ", url)
                

                const d = Papa.parse(plot.data)
                const d_clean: any[] = d.data
                console.log(d_clean)

                const dimensions: string[] = d_clean[0]
                // Remove Time (s)
                dimensions.shift()

                dimensions.forEach((dim, i) => {
                    // Create one object per field
                    data[dim] = []
                    d_clean.forEach((line, j) => {
                        if (j > 0 && line.length > 1) {
                            data[dim].push({
                                argument: line[0],
                                value: line[i+1],
                            })
                        }
                    })

                })

                if (isMounted) {
                    console.log(data)
                    setData(data)
                    setFieldList(dimensions)
                    setField(dimensions[0])
                    const p: JSX.Element | null = <Plot data={data[dimensions[0]]}/>
                    setPlot(p)
                }
            })
            .catch((err) => {
                console.log(err)
            })

        return () => { isMounted = false }
    }

    useEffect(() => {
        isMounted = true
        let plotCategories: string[] = []
        props.plots.forEach((plot) => {
            plotCategories.push(plot.category)
        })
    
        setCategoryList(plotCategories)
        setCategory(plotCategories[0])
        getData(searchUrl(plotCategories[0], props.plots))
    

    }, [])

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            },
            selectEmpty: {
            marginTop: theme.spacing(2),
            },
        }),
    )

    const classes = useStyles();

    const handleCategoryChange = (event: React.ChangeEvent<{ value: string }>) => {
        const t = event.target.value as string
        const url = searchUrl(t, props.plots)
        setCategory(t)
        isMounted = true
        getData(url)
    }

    const handleFieldChange = (event: React.ChangeEvent<{ value: string }>) => {
        const f = event.target.value as string
        const p: JSX.Element | null = <Plot data={data[f]}/>
        setField(f)
        setPlot(p)
    }

    return (
        <div className="chartContainer">
            <div className="plot">
                <div className="selectBoxes">
                    <FormControl key="categories" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            {categoryList.map((category) => {
                                return (
                                    <MenuItem key={category} className="menuItem" value={category}>{category.replace(/_/g, " ").toLowerCase()}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <FormControl key="fields" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Field</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={field}
                            onChange={handleFieldChange}
                        >
                            {fieldList.map((field) => {
                                return (
                                    <MenuItem key={field} className="menuItem" value={field}>{field}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </div>
                {plot}
            </div>
        </div>
    )
}

export default ChartContainer