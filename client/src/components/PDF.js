import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useFetch } from './hooks/useFetch';

export const PDF = () => {
    const stockGroupURL = 'http://localhost:3001/api/stocktypes'

    const { data: stockTypes, loading, error } = useFetch(stockGroupURL)

    const pdfUrl = 'http://localhost:3001/api/create-pdf'
    const getPdfURl = 'http://localhost:3001/api/fetch-pdf'
    const [form, setForm] = useState({
        name: '',
        ordernumber: 0,

        item1: {
            name: '',
            amount: 0,
            cost: 0
        },
        item2: {
            name: '',
            amount: 0,
            cost: 0
        },
        item3: {
            name: '',
            amount: 0,
            cost: 0
        }
    }
    )



    const [stocks, setStocks] = useState([])

    const [selectedStock, setSelectedStock] = useState({})

    const createAndDownloadPDF = () => {

        axios.post(pdfUrl, form).then(() => axios.get(getPdfURl, { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
                console.log(res)
                saveAs(pdfBlob, 'newPdf.pdf');
            })
    }
    console.log(selectedStock && selectedStock)
    return (
        <div>
            {stockTypes && stockTypes.map(stocktype =>
                <div>
                    <button onClick={() => setStocks(stocktype.stocks)}>{stocktype.name}</button>
                </div>)}
            {stocks && stocks.map(stock =>
                <div>
                    <h2>{stock.name}</h2>
                    <input type="number"
                        placeholder='Number Required'
                        name='orderamount'
                        onChange={(e) => {
                            setSelectedStock(e.target.value)
                        }}
                    ></input>
                </div>
            )
            }

            <input type='number'
                placeholder="Order Number"
                name="ordernumber"
                onChange={(e) => setForm({ ...form, ordernumber: e.target.value })} />
            <button onClick={createAndDownloadPDF}>
                Download PDF
            </button>
        </div >
    )
}