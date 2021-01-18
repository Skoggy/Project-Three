import { React, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import getStock from '../utils/getStock'
import axios from "axios"
import { StockContext } from '../utils/StockContext';

const ButtonStyles = styled.button`
padding: 8px;
background-color:var(--lightGrey);
border-color:var(--lightGrey);

`

const ButtonContainerStyles = styled.div`
display:grid;
grid-template-rows: auto 1fr;
`

export const StockGroupList = () => {

    const [allStockGroups, setAllStockGroups] = useState([])
    const [stockName, setStockName] = useState({
        name: ''
    })
    const stockGroupURL = 'http://localhost:3001/api/stocktype'


    useEffect(() => {
        axios(stockGroupURL).then(res => {
            setAllStockGroups(res)
            console.log(res)
        })
    }, [])


    const insertStockGroup = (e) => {
        e.preventDefault();
        const data = { name: stockName.name }
        axios.post(stockGroupURL, data).then((result) => {
            console.log(result.data)
        })
    }
    const onChange = (e) => {
        e.persist();
        setStockName({ ...stockName, [e.target.name]: e.target.value })

    }

    return (

        <ButtonContainerStyles>
            {allStockGroups.data.map(res => <ButtonStyles key={res.id}>{res.name}</ButtonStyles>)}
            <form onSubmit={insertStockGroup}>
                <label>Name</label>
                <input type="text" name="name" id="Name" placeholder="Name" value={stockName.name} onChange={onChange} />
                <button>Submit</button>
            </form>
        </ButtonContainerStyles>
    )
}
