import { React, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useFetch } from './hooks/useFetch';
import API from '../utils/API'
import { AddStock } from './AddStock';
import { PDF } from './PDF';


const FlexDivisionStyles = styled.div`
display:flex;
flex-flow: row;
width: 100vw;
@media (max-width: 700px ) {
    display:flex;
    flex-flow:column;
    }
`

const AddStockDiv = styled.div`
width: 33vw;
border: 5px solid red;
display:flex; 
flex-flow: column;
justify-content:space-around;

`
const FormStyles = styled.div`


justify-items:center;
    h3 {
        font-size:2rem;
    }
    h4 {
        font-size: 1.5rem;

    }
    p {
        font-size: 1.0rem;
    }
`
const ButtonGrid = styled.div`
display:grid;
grid-template-columns: 8fr 1fr;
`
const StockTypeStyles = styled.div`
display:flex;
flex-flow: column;
width: 33vw;
padding-right: 10px;
overflow:auto;

border-right: 1px solid black;
`

const Middle = styled.div`
display:flex;
flex-flow:column;
border-left: 1px solid black;
min-height:40vh;
width: 33vw;
`
const StockStyles = styled.div`
display:flex;
flex-flow:column;
height:69vh;

`
const SelectedStock = styled.div`
display:flex;
max-height:30vh;
border: 5px solid red;

width: 33vw;
align-self:flex-end;
`
const ButtonStyles = styled.button`
background-color:var(--lightGrey);
border-color:var(--lightGrey);
font-size:1.5rem;
min-height: 3rem;
max-height: 3rem;
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
        minAmount: ''
    })

    // useFetch to retrieve stocktypes
    const { data: stockTypes, loading, error, updateState } = useFetch(stockGroupURL)

    const deleteStockType = (item, e) => {
        const uuid = item.uuid;
        API.delete(uuid).then((result) => {
        })
    }

    const deleteStock = (item, e) => {
        const uuid = item.uuid;
        API.deleteStock(uuid).then((result) => {
        })
    }


    // used to insert new stocktype into the stocktype database.
    const insertStockGroup = (e) => {
        e.preventDefault();
        const data = { name: stockTypeInput.name }
        axios.post(stockGroupURL, data).then((result) => {
            updateState(result.data)

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
                    <ButtonGrid>
                        <ButtonStyles
                            key={item.uuid}
                            onClick={() => setCurrentStock(item.stocks)}>{item.name}
                        </ButtonStyles>
                        <ButtonStyles
                            onClick={(e) => deleteStockType(item, e)}
                        >X</ButtonStyles>
                    </ButtonGrid>
                )}
            </StockTypeStyles>
            <StockStyles>
                <Middle>
                    {currentStock && currentStock.map(item =>
                        <ButtonGrid>
                            <ButtonStyles
                                key={item.uuid}
                                onClick={() =>
                                    setSelectedStock({
                                        ...selectedStock,
                                        name: item.name,
                                        amount: item.amount,
                                        value: item.value,
                                        uuid: item.uuid,
                                        minAmount: item.minAmount,
                                        note: item.note
                                    })}>
                                {item.name}
                                <ButtonStyles
                                    onClick={(e) => deleteStock(item, e)}
                                >X</ButtonStyles>
                            </ButtonStyles>
                        </ButtonGrid>)

                    }
                </Middle>
                <SelectedStock>
                    {selectedStock ?
                        <FormStyles>
                            <form>
                                <h3>Item: {selectedStock.name}</h3>
                                <h4>Value: {selectedStock.value}</h4>
                                <h4>Amount Remaning: {selectedStock.amount} / {selectedStock.minAmount}</h4>
                                <p>Notes: {selectedStock.note}</p>
                            </form>
                        </FormStyles>
                        :
                        <div></div>}
                </SelectedStock>
            </StockStyles>
            <AddStockDiv>
                <h1>Create a New Stock Provider</h1>
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
                <AddStock />
                <PDF />
            </AddStockDiv>
        </FlexDivisionStyles>

    )
}

