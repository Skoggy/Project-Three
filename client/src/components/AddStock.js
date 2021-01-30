import React, { useState, useEffect, useContext } from 'react';
import { useFetch } from './hooks/useFetch';
import axios from 'axios';
import styled from 'styled-components'
import { useUserContext } from '../utils/UserContext';


const Div = styled.div`

`
export const AddStock = () => {

    const stockURL = 'http://localhost:3001/api/stocks'
    const stockGroupURL = 'http://localhost:3001/api/stocktypes'

    const { data: stockTypes, loading, error, updateState } = useFetch(stockGroupURL)
    const { user, setUser } = useUserContext()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const user = (loggedInUser);
            setUser(user);
        }
    }, []);

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

            console.log(result)
            updateState(result.data)
        })
    }
    const setStockTypeNames = (e, stocktype) => {
        e.preventDefault();
        setStockInput({ ...stockInput, stocktypeUuid: stocktype.uuid })
    }
    console.log(stockInput)

    const onChangeStock = (e) => {
        // e.persist();
        setStockInput({ ...stockInput, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h1>Add a New Stock</h1>
            <form>
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

                    <button id={stocktype.id} onClick={(e) => { setStockTypeNames(e, stocktype) }}>{stocktype.name}</button>
                )}

                <button
                    type="submit" onClick={(e) => insertStock(e)}>Submit
                    </button>
            </form>
        </div>
    )
}