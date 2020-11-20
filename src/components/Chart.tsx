import * as React from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  SplineSeries
} from '@devexpress/dx-react-chart-material-ui';
import { PlotDataPoint } from './ChartContainer';

export interface ChartProps {
  data: PlotDataPoint[],
}


// Default plot //TODO: Remove default plot
// const generateData = (start: number, end: number, step: number, m: string) => {
//   const data: PlotDataPoint[] = []
//   for (let i = start; i < end; i += step) {
//       const v = m == "cos" ? Math.cos(i) : Math.sin(i)
//       data.push({ value: v / i, argument: i })
//   }
//   return data
// }

const Plot = (props: ChartProps) => {
  return (
    <div>
      <Chart data={props.data} height={250}>
        <ArgumentAxis />
        <ValueAxis />
        <SplineSeries
          name="spline"
          color="#0076a8"
          valueField="value"
          argumentField="argument"
        />
      </Chart>
    </div>
  );
}

export default Plot