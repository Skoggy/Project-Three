import { React, useState } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useFetch } from './hooks/useFetch';
import API from '../utils/API'
import { PDF } from './PDF';


const FlexDivisionStyles = styled.div`
display:flex;
flex-flow: row;
width: 100vw;
margin: 1rem;
border: 1px solid black;
@media (max-width: 700px ) {
    display:flex;
    flex-flow:column;
    height: 50vh;
    }

`
const AddStockDiv = styled.div`
width: 33vw;
display:flex; 
flex-flow: column;
justify-content:space-around;
border-left: 1px solid black;
margin-right: 1rem;
height: 50vh;
margin-top: 10rem;
.top {
    flex: 0 1 auto;
}
.middle {
    flex: 1 1 auto;
}
.bottom {
    flex: 0 1 auto;
}
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
min-height:50vh;
max-height:50vh;
width: 32vw;
`
const StockStyles = styled.div`
display:flex;
flex-flow:column;
height:69vh;
overflow:auto;
`
const SelectedStock = styled.div`
display:flex;
flex-flow: column;
max-height:30vh;
width: 31vw;
align-self:flex-end;
`
const ButtonStyles = styled.button`
background-color:var(--lightGrey);
border-color:var(--lightGrey);
font-size:1.5rem;
min-height: 3rem;
max-height: 3rem;
`
const AddStockForm = styled.div`
font-size: 1.33rem;
display:flex;
flex-flow:column;
justify-content:space-around;
max-height:50vh;
margin-left: 1rem;

input {
    width:11rem;
}

`
const SubmitButton = styled.button`
width: 33vh;
height: 2rem;
margin-left: 7.5rem;
`

const AddStockGrid = styled.div`
display:grid;
grid-template-columns:  1fr;
margin-left: 1rem;
`

export const StockGroupList = () => {

    const stockGroupURL = 'http://localhost:3001/api/stocktypes'


    // sets which stocks under which stocktype is selected
    const [currentStock, setCurrentStock] = useState(undefined)

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
    const { data: stockTypes, loading, error, updateState, removeItem } = useFetch(stockGroupURL)

    const deleteStockType = (item) => {
        const uuid = item.uuid;
        API.delete(uuid).then((result) => {
            removeItem(uuid)
        })
    }

    const deleteStock = (item) => {
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

    const stockURL = 'http://localhost:3001/api/stocks'

    // gets all of the updated stocks and populates the stock list
    const putCurrentStock = (e, item) => {
        axios.get(stockGroupURL).then(result => {

            const filter = result.data.filter(i => i.id === item.id)

            setCurrentStock(filter[0].stocks)
        })
    }

    // state for storing the selected stock
    const [stockInput, setStockInput] = useState({
        name: '',
        value: '',
        amount: '',
        uuid: '',
        minAmount: '',
    })

    // used to insert new stock into database.
    const insertStock = (e) => {
        e.preventDefault()
        const data = {
            name: stockInput.name,
            value: stockInput.value,
            amount: stockInput.amount,
            minAmount: stockInput.minAmount,
            stocktypeUuid: stockInput.stocktypeUuid
        }
        axios.post(stockURL, data).then((result) => {

        })
    }

    // gets the stock name and puts into state for creating new stocktype
    const setStockTypeNames = (e, stocktype) => {
        e.preventDefault();
        setStockInput({ ...stockInput, stocktypeUuid: stocktype.uuid })
    }


    const onChangeStock = (e) => {
        // e.persist();
        setStockInput({ ...stockInput, [e.target.name]: e.target.value })
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
                            onClick={(e) => (putCurrentStock(e, item))}>{item.name}
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
                        <ButtonGrid key={item.uuid}>
                            <ButtonStyles
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
                            </ButtonStyles>
                            <ButtonStyles
                                onClick={() => deleteStock(item)}
                            >X</ButtonStyles>
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
                <div className="top">
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
                </div>
                <div className='middle'>
                    <AddStockForm>

                        <h1>Add a New Stock</h1>
                        <AddStockGrid>
                            <label>Name</label>
                            <input type="text"
                                name="name"
                                id="Name"
                                placeholder="Name"
                                value={stockInput.name}
                                onChange={onChangeStock} />
                            <label>Value</label>
                            <input type="float"
                                name="value"
                                id="Value"
                                placeholder="Value"
                                value={stockInput.value}
                                onChange={onChangeStock} />
                            <label>Amount</label>
                            <input type="text"
                                name="amount"
                                id="Amount"
                                placeholder="Amount"
                                value={stockInput.amount}
                                onChange={onChangeStock} />
                            <label>Min Amount</label>
                            <input type="text"
                                name="minAmount"
                                id="MinAmount"
                                placeholder="Minimum Amount"
                                value={stockInput.minAmount}
                                onChange={onChangeStock} />
                            <div>
                                {stockTypes.map(stocktype =>
                                    <ButtonGrid>
                                        <button id={stocktype.id} onClick={(e) => { setStockTypeNames(e, stocktype) }}>{stocktype.name}</button>
                                    </ButtonGrid>
                                )}
                                <SubmitButton type="submit" onClick={(e) => insertStock(e)}>Submit</SubmitButton>
                            </div>
                        </AddStockGrid>
                    </AddStockForm >
                </div>
                <div className='bottom'>
                    <PDF />
                </div>
            </AddStockDiv>
        </FlexDivisionStyles>
    )
}

