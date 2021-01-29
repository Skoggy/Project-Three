import { React, useState } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useFetch } from './hooks/useFetch';
import { Input } from '../components/Form'
import API from '../utils/API'


const FlexDivisionStyles = styled.div`
display:flex;
flex-flow: row;
grid-template-columns: repeat(1, minmax(0, 1fr));
/* width: 100vw; */
height: 69vh;
@media (max-width: 700px ) {
    display:grid;
    grid-template-rows: repeat(3, minmax(0, 1fr));
    }
`
const FormStyles = styled.div`
 flex: 0 1 auto;

justify-items:center;
    h3 {
        font-size:2rem;
    }
    p {
        font-size: 1.5rem;
    }
`
const ButtonGrid = styled.div`
display:grid;
grid-template-columns: 8fr 1fr;
`
const StockTypeStyles = styled.div`
display:flex;
flex-flow: column;
flex: 1 1 auto;
padding-right: 10px;
overflow:auto;
width:45vh;
border-right: 1px solid black;
`

const Middle = styled.div`
display:flex;
flex-flow:column;
border-left: 1px solid black;
min-height:43vh;
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
width:45vh;
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
    const stockURL = 'http://localhost:3001/api/stocks'

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

    const [stockInput, setStockInput] = useState({
        name: '',
        value: '',
        amount: '',
        uuid: '',
        minAmount: '',
        stockTypeId: ''
    })

    // useFetch to retrieve stocktypes
    const { data: stockTypes, loading, error, updateState } = useFetch(stockGroupURL)

    const deleteStockType = (item) => {
        const uuid = item.uuid;
        API.delete(uuid).then((result) => {

        })
    }

    // used to insert new stock into database.
    const insertStock = (e) => {
        e.preventDefault();
        const data = {
            name: stockInput.name,
            value: stockInput.value,
            amount: stockInput.amount,
            minAmount: stockInput.minAmount,
            stocktypeUuid: stockInput.stocktypeUuid
        }
        axios.post(stockURL, data).then((result) => {
            console.log(result)
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
    console.log(stockInput)

    const onChangeStockType = (e) => {
        // e.persist();
        setStockTypeInput({ ...stockTypeInput, [e.target.name]: e.target.value })
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

                {stockTypes && stockTypes.map(item =>
                    <ButtonGrid>
                        <ButtonStyles
                            key={item.uuid}
                            onClick={() => setCurrentStock(item.stocks)}>{item.name}
                        </ButtonStyles>
                        <ButtonStyles
                            onClick={() => deleteStockType(item)}
                        >X</ButtonStyles>
                    </ButtonGrid>
                )}
            </StockTypeStyles>
            <Middle>
                <StockStyles>
                    <Middle>
                        {currentStock && currentStock.map(item =>

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
                            </ButtonStyles>)
                        }
                    </Middle>
                    <SelectedStock>
                        {selectedStock ?
                            <FormStyles>
                                <form>
                                    <h3>Item: {selectedStock.name}</h3>
                                    <p>Value: {selectedStock.value}</p>
                                    <p>Amount Remaning: {selectedStock.amount} / {selectedStock.minAmount}</p>

                                    <Input
                                        type="text"
                                        onChange={(e) => console.log(e.target.value)} />
                                </form>
                            </FormStyles>
                            :
                            <div></div>}
                    </SelectedStock>
                </StockStyles>
            </Middle>
            <form onSubmit={insertStock}>
                <label>Name</label>
                <input type="text"
                    name="name"
                    id="Name"
                    placeholder="Name"
                    value={stockInput.name}
                    onChange={onChangeStock} />

                <input type="float"
                    name="value"
                    id="Value"
                    placeholder="Value"
                    value={stockInput.value}
                    onChange={onChangeStock} />

                <input type="text"
                    name="amount"
                    id="Amount"
                    placeholder="Amount"
                    value={stockInput.amount}
                    onChange={onChangeStock} />

                <input type="text"
                    name="minAmount"
                    id="MinAmount"
                    placeholder="Minimum Amount"
                    value={stockInput.minAmount}
                    onChange={onChangeStock} />


                {stockTypes && stockTypes.map(stocktype =>
                    <div>
                        <button onClick={() => {
                            setStockInput({ ...stockInput, stocktypeUuid: stocktype.uuid })
                        }}>{stocktype.name}</button>
                    </div>)}

                <button
                    type="submit">Submit
                    </button>
            </form>

        </FlexDivisionStyles>
    )
}

