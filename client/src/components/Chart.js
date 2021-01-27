import React from 'react';

import { Line } from 'react-chartjs-2';
import styled from 'styled-components';


const Chart = styled.div`
  margin: 0 auto;
 width:100vh;
 height: 100%;
`




export default function ChartTest(props) {





    // useEffect(() => {
    //     let amount = [];
    //     let dateTaken = [];
    //     data && data.forEach(thing => {
    //         thing.stocks.forEach(item => {
    //             amount.push(item.amount)
    //             dateTaken.push(item.updatedAt)
    //             console.log(item)
    //         }
    //         )
    //     })
    //     setDataChart({
    //         labels: dateTaken,
    //         datasets: [{
    //             label: 'Amount In Stock',
    //             data: amount
    //         }]
    //     })
    // }, [data])

    return (

        <Chart>
            <Line data={props} />
        </Chart>

    )

}