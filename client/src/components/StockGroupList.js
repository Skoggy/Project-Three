import { React, useState } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useFetch } from './hooks/useFetch';
import API from '../utils/API'
import { PDF } from './PDF';

const WrapperStyles = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-gap:10px;
border: 2px solid black;
`

const StockTypeDivStyles = styled.div`
margin-top: 20px;

max-height: 100%;
border: 2px solid black;

button {
    height: 50px;  
}
`

const StockDivStyles = styled.div`
display:grid;
`

const ButtonGridDivStyles = styled.div`
display: grid;
grid-template-columns: 10fr 1fr;
`


export const StockGroupList = () => {
    const stockURL = '/api/stocks'
    const stockGroupURL = '/api/stocktypes'


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
        <WrapperStyles>
            <StockTypeDivStyles>
                {stockTypes && stockTypes.map(item =>
                    <ButtonGridDivStyles key={item.uuid}>
                        <button

                            onClick={(e) => (putCurrentStock(e, item))}>{item.name}
                        </button>
                        <button
                            onClick={(e) => deleteStockType(item, e)}
                        >X</button>
                    </ButtonGridDivStyles>
                )}
            </StockTypeDivStyles>
            <StockDivStyles>
                <div>
                    {currentStock && currentStock.map(item =>
                        <ButtonGridDivStyles key={item.uuid}>
                            <button
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
                            </button>
                            <button
                                onClick={() => deleteStock(item)}
                            >X</button>
                        </ButtonGridDivStyles>)
                    }
                </div>
                <div>
                    {selectedStock ?

                        <div>
                            <h3>Item: {selectedStock.name}</h3>
                            <h4>Value: {selectedStock.value}</h4>
                            <h4>Amount Remaning: {selectedStock.amount} / {selectedStock.minAmount}</h4>
                            <p>Notes: {selectedStock.note}</p>
                        </div>

                        :
                        <div></div>}
                </div>
            </StockDivStyles>
            <div>

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


                <form>

                    <h1>Add a New Stock</h1>
                    <div>
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
                                <ButtonGridDivStyles key={stocktype.id}>
                                    <button id={stocktype.id} onClick={(e) => { setStockTypeNames(e, stocktype) }}>{stocktype.name}</button>
                                </ButtonGridDivStyles>
                            )}
                            <button type="submit" onClick={(e) => insertStock(e)}>Submit</button>
                        </div>
                    </div>
                </form >
                <PDF />
            </div>



        </WrapperStyles>

    )
}

