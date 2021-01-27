import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useFetch } from './hooks/useFetch';
import { Input, TextArea, FormBtn } from '../components/Form'

import { Line } from 'react-chartjs-2';

const FlexDivisionStyles = styled.div`
display:grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
width: 100%;

`

const StockTypeStyles = styled.div`
display:grid;
grid-template-rows: repeat( auto-fit, minmax(50, 2fr) );
grid-template-columns: repeat(auto-fit, minmax(50, 2fr) );
padding-right: 10px;
/* border: 5px solid red; */
`
const StockStyles = styled.div`
display:grid;
grid-template-rows: repeat( auto-fit, minmax( 1fr) );
/* border: 5px solid red; */
`

const SelectedStock = styled.div`

border: 5px solid red;


`
const ButtonStyles = styled.button`
border-right: none;
border-left: none;
background-color:var(--lightGrey);
border-color:var(--lightGrey);
font-size:2rem;
min-height: 3rem;
max-height: 3rem;
`



const Chart = styled.div`
  margin: 0 auto;
 width:33vh;
 height:75vh;
`
export const StockGroupList = () => {


    const stockGroupURL = 'http://localhost:3001/api/stocktypes'

    // sets which stocks under which stocktype is selected
    const [currentStock, setCurrentStock] = useState([])

    // for adding new stocktype
    const [stockTypeInput, setStockTypeInput] = useState({
        name: '',
        uuid: ''
    })

    const [selectedStock, setSelectedStock] = useState({
        name: '',
        value: '',
        amount: '',
        uuid: '',
        updatedAt: '',
        minAmount: ''
    })

    // useFetch to retrieve stocktypes
    const { data: stockTypes, loading, error } = useFetch(stockGroupURL)


    // used to insert new stocktype into the stocktype database.
    const insertStock = (e) => {
        e.preventDefault();
        const data = {
            name: selectedStock.name,
            value: selectedStock.value,
            amount: selectedStock.amount,
        }
        axios.post(stockGroupURL, data).then((result) => {
            console.log(result.data)
        })
    }

    const insertStockGroup = (e) => {
        e.preventDefault();
        const data = { name: stockTypeInput.name }
        axios.post(stockGroupURL, data).then((result) => {
            console.log(result.data)
        })
    }


    const onChangeStockType = (e) => {
        // e.persist();
        setStockTypeInput({ ...stockTypeInput, [e.target.name]: e.target.value })
    }

    stockTypes && stockTypes.forEach(thing => { (thing.stocks.forEach(item => { console.log(item.minAmount) })) })

    if (loading) return <p>Loading</p>
    else if (error) return <p>Error</p>
    // else if (stockTypes.length === 0) <p>No results found</p>
    return (
        <FlexDivisionStyles>

            <StockTypeStyles>
                {stockTypes && stockTypes.map(item =>
                    <ButtonStyles
                        key={item.uuid}
                        onClick={() => setCurrentStock(item.stocks)}>{item.name}
                    </ButtonStyles>)}

                <form onSubmit={insertStockGroup}>
                    <label>Name</label>
                    <input type="text"
                        name="name"
                        id="Name"
                        placeholder="Name"
                        value={stockTypeInput.name}
                        onChange={onChangeStockType} />
                    <button
                        type="submit">Submit
                    </button>
                </form>
            </StockTypeStyles>

            <StockStyles>
                {currentStock && currentStock.map(item =>
                    <ButtonStyles
                        key={item.uuid} onClick={() => setSelectedStock({ ...selectedStock, name: item.name, amount: item.amount, value: item.value, uuid: item.uuid, updatedAt: item.updatedAt, minAmount: item.minAmount })}>{item.name}
                    </ButtonStyles>)}


                <SelectedStock>
                    {selectedStock ?
                        <form>
                            <h3>Item: {selectedStock.name}</h3>
                            <p>Value: {selectedStock.value}</p>
                            <p>Amount Remaning: {selectedStock.amount} / {selectedStock.minAmount}</p>

                            <Input
                                type="text"
                                onChange={console.log(selectedStock)} />
                        </form>
                        :
                        <div></div>}
                </SelectedStock>
            </StockStyles>
            {/* <Chart>
                <Line data={dataChart} />
            </Chart> */}

        </FlexDivisionStyles>
    )
}

