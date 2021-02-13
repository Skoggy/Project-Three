import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import styled from 'styled-components';


const All = styled.div`
min-height:33vh;
`

const ButtonGrid = styled.div`
 display:grid;
grid-template-columns: 8fr 1fr; 

`
const InputGrid = styled.div`
 display:grid;
 grid-template-columns: 1fr 1fr 1fr;
`


export const PDF = () => {
    const [stockTypes, setStocktypes] = useState(undefined)
    const stockGroupURL = '/api/stocktypes'

    const fetchList = () => {
        axios.get(stockGroupURL).then(result => {
            setStocktypes(result.data)
        }
        )
    }

    const pdfUrl = '/api/create-pdf'
    const getPdfURl = '/api/fetch-pdf'
    const [form, setForm] = useState(null)

    const createAndDownloadPDF = () => {
        axios.post(pdfUrl, form).then(() => axios.get(getPdfURl, { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
                console.log(res)
                saveAs(pdfBlob, 'newPdf.pdf');
                setForm(null)
                setStocktypes(null)
            })
    }
    const changeValue = (e, item) => {
        const newAmount = parseInt(e.target.value);
        const indexOfStock = form.findIndex((stock) => stock.id === item.id)
        const slicedFormStart = form.slice(0, indexOfStock)
        const updatedItem = { ...form[indexOfStock], amount: newAmount }
        const slicedFormEnd = form.slice(indexOfStock + 1)
        const newForm = [...slicedFormStart, updatedItem, ...slicedFormEnd]
        setForm(newForm)
    }
    return (
        <All>
            <h1>Create a Stock Order Form</h1>
            {form ?
                form.map(item =>
                    <div key={item.id}>
                        <label>
                            {item.name}</label>
                        <InputGrid>
                            <input
                                type='number'
                                placeholder="Amount"
                                onChange={(e) => changeValue(e, item)} />
                        </InputGrid>
                    </div>
                )
                :
                <div>
                    {stockTypes && stockTypes.map(stocktype =>
                        <ButtonGrid key={stocktype.id}>
                            <button onClick={() => setForm(stocktype.stocks)}>
                                {stocktype.name}
                            </button>

                        </ButtonGrid>
                    )}
                </div>
            }
            {form ?
                <div>
                    <button onClick={createAndDownloadPDF}>
                        Download PDF
                        </button>
                    <button onClick={() => setForm(null)}>Cancel</button>
                </div>
                :
                <div></div>
            }
            {stockTypes ?

                <button onClick={() => setStocktypes(null)}>Cancel</button>
                :
                <button onClick={fetchList}>List</button>
            }

        </All >

    )
}