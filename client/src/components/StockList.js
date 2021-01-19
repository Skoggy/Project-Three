import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'

export const StockList = () => {

    const stockURL = 'http://localhost:3001/api/stocks'
    const stockGroupURL = 'http://localhost:3001/api/stocktypes'

    const [allStockGroups, setAllStockGroups] = useState([])


    const [allStockFromGroup, setAllStockFromGroup] = useState([])
    const [stock, setStock] = useState({
        name: '',
        value: '',
        stocktypeId: ''
    })

    useEffect(() => {
        axios(stockGroupURL).then(res => {
            setAllStockGroups(res.data)
            console.log(res)
        })
    }, [])

    const insertStock = (e) => {
        e.preventDefault();
        const data = {
            name: stock.name,
            value: stock.value,
            stocktypeUuid: "209aaf0c-a226-40ab-aa62-d25e604c5b62"
        }
        axios.post(stockURL, data).then((result) => {
            console.log(result.data)

        })
    }
    const onChange = (e) => {
        e.persist();
        setStock({ ...stock, [e.target.name]: e.target.value })

    }
    // console.log(allStockGroups.map(item => item.uuid))
    return (


        <form onSubmit={insertStock}>
            <label>Name</label>
            <input type="text" name="name" id="Name" placeholder="Name" value={stock.name} onChange={onChange} />
            <label>Value</label>
            <input type="float" name="value" id="Value" placeholder="Value" value={stock.value} onChange={onChange} />
            <button>Submit</button>
        </form>


    )
}