// import React from 'react'
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js'
// import { useTheme } from '../Constext/themeContext';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );


// const Graph = ({ graphData }) => {
//     let theme = useTheme();

//     //here due to lots of rendering in the componene the 
//     //result in the graphData is repeat to get only one time data .
//     //we use 'Set' and create newGraphData and use to generate the result.
//     let temp = new Set();
//     let newGraphData = graphData.filter((i) => {

//         if (!temp.has(i[0])) {
//             temp.add(i[0])
//             return i;
//         }
//     })


//     return (
//         <div>
//             <Line
//                 data={
//                     {
//                         labels: newGraphData.map(i => i[0]),
//                         datasets: [
//                             {
//                                 data: newGraphData.map(i => i[1]),
//                                 label: 'wpm',
//                                 borderColor: theme.textColor,
//                             },

//                         ]
//                     }
//                 }
//             />
//         </div>
//     )
// }

// export default Graph


import React from 'react'
import { Line } from 'react-chartjs-2';
import { useTheme } from '../Constext/themeContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = ({ graphData }) => {

    const { theme } = useTheme();

    return (
        <div>
            <Line
                data={
                    {
                        labels: graphData.map(i => (i[0])),
                        datasets: [
                            {
                                data: graphData.map(i => i[1]),
                                label: 'wpm',
                                borderColor: theme.textColor,
                            }
                        ]
                    }
                }
            />
        </div>
    )
}

export default Graph