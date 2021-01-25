import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useFetch } from './hooks/useFetch';

const FlexDivisionStyles = styled.div`
display:flex;
`
const ButtonStyles = styled.button`
padding: 8px;
background-color:var(--lightGrey);
border-color:var(--lightGrey);
`
const StockTypeStyles = styled.div`
display:grid;
grid-template-rows: auto 1fr;
`
const StockStyles = styled.div`
display:grid;
grid-template-rows: 1fr;
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
    const { data: stockTypes, loader, error } = useFetch(stockGroupURL)


    // used to insert new stocktype into the stocktype database.
    const insertStockGroup = (e) => {
        e.preventDefault();
        const data = { name: stockTypeInput.name }
        axios.post(stockGroupURL, data).then((result) => {
            console.log(result.data)
        })
    }
    const onChangeStockType = (e) => {
        e.persist();
        setStockTypeInput({ ...stockTypeInput, [e.target.name]: e.target.value })
    }

    return (
        <FlexDivisionStyles className='flex'>
            <StockTypeStyles className="flex-initial">
                {stockTypes && stockTypes.map(item => <ButtonStyles key={item.uuid} onClick={() => setCurrentStock(item.stocks)}>{item.name}</ButtonStyles>)}
            </StockTypeStyles>
            <StockStyles>
                {currentStock && currentStock.map(item => <ButtonStyles key={item.uuid}>{item.name}</ButtonStyles>)}
            </StockStyles>

            <form onSubmit={insertStockGroup}>
                <label>Name</label>
                <input type="text" name="name" id="Name" placeholder="Name" value={stockTypeInput.name} onChange={onChangeStockType} />
                <button>Submit</button>
            </form>
        </FlexDivisionStyles>
    )
}

