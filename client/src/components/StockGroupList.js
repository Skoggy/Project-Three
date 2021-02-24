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

@media(max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 30px;
  }

`
const StockTypeDivStyles = styled.div`
margin-top: 20px;
max-height: 100vh;
overflow:auto;
padding: 5px;
box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
`

const StockDivStyles = styled.div`
display: grid;
grid-template-rows: 3fr 1fr;
margin-top: 20px;
padding: 5px;
box-shadow: 0px 3px 15px rgba(0,0,0,0.2);

@media(max-width: 1000px) {
    grid-template-rows: 1fr;
  }
`

const SelectedStockDiv = styled.div`
display:grid;
font-size: 20px;
margin: 5px;
padding: 5px;
box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
`

const ButtonGridDivStyles = styled.div`
display: grid;
grid-template-columns: 10fr 1fr;
`

const ButtonGridCreateStock = styled.div`
 display:grid;
grid-template-columns: 1fr;
`

const RightSideDivStyles = styled.div`
display:grid;
grid-template-rows: repeat(3 1fr);
grid-gap:30px;
margin-top: 20px;
box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
padding: 5px;

button {
      width:100%;
    }
@media(max-width: 1000px) {
    justify-items:center;
    button {
      width:100%;
    }
  }
`

const AddNewStockInputStyles = styled.div`
display: grid;
grid-template-columns: auto 5fr;
margin-right: 20px;
margin-bottom: 20px;
button {
      width:100%;
    }
`

const ButtonStyles = styled.button`
   height: 50px; 
    background-color: #EEEEEE;
    border: 0.5px solid #E5E5E5;
    outline:none;
    box-shadow: 0 0 1px rgba(0,0,0,0.1);
    font-size:20px;
    transition-duration: 0.4s;

:hover {
    border: 2px solid black;
}

:active {
    background-color:#bdbdbd;
}

:focus {
    background-color:#bdbdbd;
}
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

    const [addStockButton, setAddStockButton] = useState(false)
    const [addStockTypeButton, setAddStockTypeButton] = useState(false)
    const [displayPdfButton, setDisplayPdfButton] = useState(false)

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

        setStockInput({ ...stockInput, [e.target.name]: e.target.value })
    }

    const displayStock = (e) => {
        e.preventDefault();
        setAddStockTypeButton(true);
        const el = document.getElementById('pdfvisible')
        el.style.visibility = 'none'

    }

    const cancelDisplayStock = async (e) => {
        e.preventDefault();
        try {
            await setAddStockTypeButton(false)
        }
        finally {
            const el = document.getElementById('pdfvisible')
            console.log(el)
            el.style.visibility = 'visible'
        }
    }



    if (loading) return <p>Loading</p>
    else if (error) return <p>Error</p>
    // else if (stockTypes.length === 0) <p>No results found</p>
    return (
        <WrapperStyles>
            <StockTypeDivStyles>
                {stockTypes && stockTypes.map(item =>
                    <ButtonGridDivStyles key={item.uuid}>
                        <ButtonStyles
                            onClick={(e) => (putCurrentStock(e, item))}>{item.name}
                        </ButtonStyles>
                        <ButtonStyles
                            onClick={(e) => deleteStockType(item, e)}
                        >X</ButtonStyles>
                    </ButtonGridDivStyles>
                )}
            </StockTypeDivStyles>
            <StockDivStyles>
                <div>
                    {currentStock && currentStock.map(item =>
                        <ButtonGridDivStyles key={item.uuid}>
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
                        </ButtonGridDivStyles>)
                    }
                </div>
                <div>
                    {selectedStock ?
                        <SelectedStockDiv>
                            <h3>Item:{selectedStock.name}</h3>
                            <h4>Value: {selectedStock.value}</h4>
                            <h4>Amount Remaning: {selectedStock.amount} / {selectedStock.minAmount}</h4>
                            <p>Notes: {selectedStock.note}</p>
                        </SelectedStockDiv>
                        :
                        <div></div>}
                </div>
            </StockDivStyles>
            <RightSideDivStyles>
                <div>
                    {addStockButton === false && addStockTypeButton === false && displayPdfButton === false
                        ?
                        <div>
                            <ButtonStyles onClick={(e) => displayStock(e)}>
                                Create a New Stock Provider</ButtonStyles>
                        </div>
                        :
                        <div></div>}
                    {addStockButton === false && addStockTypeButton === false && displayPdfButton === false
                        ?
                        <ButtonStyles ButtonStyles onClick={() => setAddStockButton(true)}>Add Stock</ButtonStyles>
                        :
                        <div></div>
                    }
                    {addStockTypeButton === true
                        ?
                        <div>
                            <form onSubmit={insertStockGroup}>
                                <label>Name</label>
                                <input type="text"
                                    name="name"
                                    id="Name"
                                    placeholder="Name"
                                    value={stockTypeInput.name}
                                    onChange={onChangeStockType} />
                                <ButtonStyles
                                    type="submit">Submit
                    </ButtonStyles>
                                <ButtonStyles onClick={(e) => cancelDisplayStock(e)}>Cancel</ButtonStyles>
                            </form>
                        </div>
                        :
                        <div></div>}
                    <div>
                        {addStockButton === true ?
                            <div>
                                <h1>Add a New Stock</h1>
                                <form>
                                    <AddNewStockInputStyles>
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
                                    </AddNewStockInputStyles>
                                    <div>
                                        {stockTypes.map(stocktype =>
                                            <ButtonGridCreateStock key={stocktype.id}>
                                                <ButtonStyles id={stocktype.id} onClick={(e) => { setStockTypeNames(e, stocktype) }}>{stocktype.name}</ButtonStyles>
                                            </ButtonGridCreateStock>
                                        )}
                                        <ButtonStyles type="submit" onClick={(e) => insertStock(e)}>Submit</ButtonStyles>
                                        <ButtonStyles onClick={() => setAddStockButton(false)}>Cancel</ButtonStyles>
                                    </div>
                                </form >
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                    {addStockButton === false && addStockTypeButton === false && displayPdfButton === false ?
                        <div id='pdfvisible'>
                            <ButtonStyles onClick={() => setDisplayPdfButton(true)}>Generate Stock Order</ButtonStyles>
                        </div>
                        :
                        <div></div>
                    }

                    {displayPdfButton === true ? <> <PDF />
                        <ButtonStyles onClick={() => setDisplayPdfButton(false)}>Cancel</ButtonStyles>
                    </>
                        : <div></div>}

                </div>

                {console.log(displayPdfButton)}
            </RightSideDivStyles>
        </WrapperStyles >

    )
}

