import * as React from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  SplineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { PlotDataPoint } from './ChartContainer';

export interface ChartProps {
  data: PlotDataPoint[],
}

const Plot = (props: ChartProps) => {

  console.log("render plot")

  return (
    <div>
      <Chart data={props.data} height={250}>
        <ArgumentAxis />
        <ValueAxis />
        <SplineSeries
          valueField="value"
          argumentField="argument"
        />
      </Chart>
    </div>
  );
}

export default Plot