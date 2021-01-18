import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'

export const StockList = () => {

    const stockURL = 'http://localhost:3001/api/stock'

    const [allStockFromGroup, setAllStockFromGroup] = useState([])
    const [stock, setStock] = useState({
        name: ''
    })

    const insertStock = (e) => {
        e.preventDefault();
        const data = { name: stock.name }
        axios.post(stockURL, data).then((result) => {
            console.log(result.data)
        })
    }
    const onChange = (e) => {
        e.persist();
        setStock({ ...stock, [e.target.name]: e.target.value })

    }

    return (


        <form onSubmit={insertStock}>
            <label>Name</label>
            <input type="text" name="name" id="Name" placeholder="Name" value={stock.name} onChange={onChange} />
            <button>Submit</button>
        </form>


    )
}