import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import styled from 'styled-components';


const All = styled.div`
min-height:33vh;
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

const ButtonGrid = styled.div`
 display:grid;
grid-template-columns: 1fr;
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
    useEffect(() => {
        fetchList();
    }, [])


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
            {form ?
                form.map(item =>
                    <div>

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
                    </div>
                )
                :
                <div>

                    {stockTypes && stockTypes.map(stocktype =>
                        <ButtonGrid key={stocktype.id}>
                            <ButtonStyles onClick={() => setForm(stocktype.stocks)}>
                                {stocktype.name}
                            </ButtonStyles>

                        </ButtonGrid>
                    )}
                </div>
            }
            {form ?
                <div>
                    <ButtonStyles onClick={createAndDownloadPDF}>
                        Download PDF
                        </ButtonStyles>
                    <ButtonStyles onClick={() => setForm(null)}>Cancel</ButtonStyles>
                </div>
                :
                <div></div>
            }
        </All >

    )
}