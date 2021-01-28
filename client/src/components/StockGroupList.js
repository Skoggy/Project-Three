import { React, useState } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useFetch } from './hooks/useFetch';
import { Input } from '../components/Form'
import API from '../utils/API'

const FlexDivisionStyles = styled.div`
display:flex;
align-self:stretch;
flex-flow: row;
width: 100vw;
height: 69vh;
@media (max-width: 700px ) {
       
    grid-template-rows: repeat(2, minmax(0, 1fr));
    }
`
const FormStyles = styled.div`
 flex: 0 1 auto;
display: grid;
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

flex: 1 1 auto;

display:grid;
grid-template-rows: repeat( auto-fit, minmax(50, 2fr) );
grid-template-columns: repeat(auto-fit, minmax(50, 10fr) );
justify-items:stretch;
padding-right: 10px;
overflow:auto;
/* border: 5px solid red; */
`
const StockStyles = styled.div`
display:grid;
grid-template-columns: repeat(2, minmax(0, 1fr));
/* border: 5px solid red; */
`
const SelectedStock = styled.div`
max-height:30vh;
border: 5px solid red;
flex: 0 1 auto;
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
    const { data: stockTypes, loading, error, updateState, refreshState } = useFetch(stockGroupURL)

    const deleteStockType = (item) => {
        const uuid = item.uuid;
        API.delete(uuid).then((result) => {

        })
    }

    // used to insert new stock into database.
    const insertStock = (e) => {
        e.preventDefault();
        const data = {
            name: selectedStock.name,
            value: selectedStock.value,
            amount: selectedStock.amount,
        }
        axios.post(stockGroupURL, data).then((result) => {

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
    console.log(stockTypeInput)

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

            <StockStyles>
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
                    </ButtonStyles>)}

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

        </FlexDivisionStyles>
    )
}

