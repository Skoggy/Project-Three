import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useFetch } from './hooks/useFetch';
import { Input, TextArea, FormBtn } from '../components/Form'

const FlexDivisionStyles = styled.div`
display:flex;
`
const ButtonStyles = styled.button`
padding: 8px;
background-color:pink;
border-color:var(--lightGrey);
font-size:2rem;
`
const StockTypeStyles = styled.div`
display:grid;
grid-template-rows: auto 1fr;
`
const StockStyles = styled.div`
display:grid;
grid-template-rows: auto, 1fr;
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

    // useFetch to retrieve stocktypes
    const { data: stockTypes, loading, error } = useFetch(stockGroupURL)


    // used to insert new stocktype into the stocktype database.
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
                        key={item.uuid} onClick={() => console.log(item.amount)}>{item.name}
                    </ButtonStyles>)}
            </StockStyles>


        </FlexDivisionStyles>
    )
}

