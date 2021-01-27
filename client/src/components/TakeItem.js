import { React, useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { Hint } from 'react-autocomplete-hint';
import styled from 'styled-components'
import axios from 'axios';
import { Card } from './Card';


const Container = styled.div`
display:grid;
justify-items:center;


`

const Button = styled.button`

	padding: 10px 40px;
  margin: 0px 10px 10px 0px;
 
	border-radius: 10px;
	
	font-size: 25px;
	color: #FFF;
	text-decoration: none;	

	transition: all 0.1s;
    -webkit-transition: all 0.1s;

    background-color: var(--red);
	border-bottom: 5px solid var(--darkRed);
    text-shadow: 0px -2px var(--darkRed);
   :active{ 
    transform: translate(0px,5px);
  -webkit-transform: translate(0px,5px);
    border-bottom: 1px solid;
    outline:none;
   }
`
const FilloutStyles = styled.form`

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
}

input {
    width: rem;
}
input[type="number"] {
   -moz-appearance: textfield;
   width:1.5rem;
}
`

export const TakeItem = () => {
    const stockURL = 'http://localhost:3001/api/stocks'
    // const [stocks, setStocks] = useState([])
    const [search, setSearch] = useState({
        result: {},
        search: ''
    })
    const [option, setOption] = useState([])
    const [amounts, setAmounts] = useState({
        uuid: '',
        amount: ''
    })
    const { data, loader, error } = useFetch(stockURL)
    console.log(amounts.amount)


    useEffect(() => {
        setOption(data)
    }, [data,])

    const takeStock = (e) => {
        e.preventDefault();
        const data = search.result.uuid
        const put = { amount: search.result.amount - amounts.amount }
        axios.put(`${stockURL}/${data}`, put).then((result) => {
            console.log(result)
        })
    }
    const onAmountChange = (e) => {
        e.persist();
        setAmounts({ ...amounts, amount: e.target.value })
    }

    let options = []
    option && option.forEach(thing => { options.push(thing.name) })


    const checkMatch = (e) => {
        e.preventDefault()
        data.forEach(thing => {
            if (thing.name === search.search) {
                setSearch({ ...search, result: thing })

            }
        })
    }
    return (

        <Container>
            <div>
                <FilloutStyles>
                    <Hint options={options}>
                        <input type="text" placeholder="Search" onChange={(e) => setSearch({ ...search, search: e.target.value })} />
                    </Hint>
                    <button onClick={checkMatch}>Check</button>
                    {search.result.name ?
                        <div>

                            <Card
                                title={search.result.name}
                                body=''
                                amount={search.result.amount - amounts.amount}
                            />
                            <input type="number"
                                name="TakeStock"
                                id="TakeStock"
                                value={amounts.amount}
                                onChange={onAmountChange} />
                            <Button onClick={takeStock}>Take</Button>

                        </div >
                        :
                        <div>No Result Found</div>}

                </FilloutStyles >
            </div>
        </Container>
    )
}

