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
        }
    })




    const createAndDownloadPDF = () => {

        axios.post(pdfUrl, form).then(() => axios.get(getPdfURl, { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
                console.log(res)
                saveAs(pdfBlob, 'newPdf.pdf');
            })
    }

    console.log(form)
    return (
        <div>
            {stockTypes && stockTypes.map(stocktype =>
                <div>
                    <button onClick={() => setForm({
                        ...form,
                        name: stocktype.name,

                    })}>{stocktype.name}</button>
                    <input
                        type="number"
                        placeholder='Number Required'
                        name='orderamount'
                        onChange={(e) => { setForm({ ...form, item1: { amount: e.target.value, cost: e.target.value * stocktype.stocks[0].value, name: stocktype.stocks[0].name } }) }}
                    ></input>

                    <input type='number'
                        placeholder="Order Number"
                        name="ordernumber"
                        onChange={(e) => setForm({ ...form, ordernumber: e.target.value })} />
                </div>
            )}


            <button onClick={createAndDownloadPDF}>
                Download PDF
            </button>
        </div >

    )
}