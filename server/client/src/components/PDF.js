import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useFetch } from './hooks/useFetch';

export const PDF = () => {
    const stockGroupURL = '/api/stocktypes'

    const { data: stockTypes, loading, error } = useFetch(stockGroupURL)

    const pdfUrl = 'http://localhost:3001/api/create-pdf'
    const getPdfURl = 'http://localhost:3001/api/fetch-pdf'

    const [form, setForm] = useState(null)


    const createAndDownloadPDF = () => {

        axios.post(pdfUrl, form).then(() => axios.get(getPdfURl, { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
                console.log(res)
                saveAs(pdfBlob, 'newPdf.pdf');
                setForm(null)
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
        <div>
            <h1>Create a Stock Order Form</h1>
            {form ?

                form.map(item =>
                    <div key={item.id}>
                        <label>
                            {item.name}</label>
                        <input
                            type='number'
                            placeholder="Amount"
                            onChange={(e) => changeValue(e, item)} />
                    </div>
                )

                :
                <div>

                    {stockTypes && stockTypes.map(stocktype =>
                        <div key={stocktype.id}>
                            <button onClick={() => setForm(stocktype.stocks)}>
                                {stocktype.name}
                            </button>

                        </div>
                    )}
                </div>
            }

            <button onClick={createAndDownloadPDF}>
                Download PDF
            </button>

        </div >

    )
}