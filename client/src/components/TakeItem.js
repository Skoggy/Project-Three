import { React, useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { Hint } from 'react-autocomplete-hint';
import styled from 'styled-components'
import axios from 'axios';
import { Card } from './Card';


const Container = styled.div`
max-height:70vh;
display:grid;
justify-items:center;
align-content:center;
padding: 10px;
margin-top: 14rem;

input {
    height: 4rem;
    font-size: 3rem;
}
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
   width:7rem;
}
`

export const TakeItem = () => {
    const stockURL = 'http://localhost:3001/api/stocks'
    // search and the matching result
    const [search, setSearch] = useState({
        result: {},
        search: ''
    })
    // stores all of the stock names to allow for autofill
    const [option, setOption] = useState([])
    // used to get update the amount that is taken from stock
    const [amounts, setAmounts] = useState({
        uuid: '',
        amount: ''
    })
    // fetches data from url
    const { data, loader, error, updateState } = useFetch(stockURL)


    // sets the option with the data to get the names.
    useEffect(() => {
        setOption(data)
    }, [data,])

    // takes stock from database
    const takeStock = (e) => {
        e.preventDefault();
        const data = search.result.uuid
        const put = { amount: search.result.amount - amounts.amount }
        axios.put(`${stockURL}/${data}`, put).then((result) => {
            console.log(result)
        })
    }
    // takes what is put in the amount to be updated.
    const onAmountChange = (e) => {
        e.persist();
        setAmounts({ ...amounts, amount: e.target.value })
    }

    // pushes the names of all the stock into the options array to be used for autofill.
    let options = []
    option && option.forEach(thing => { options.push(thing.name) })

    // checks if there is a match.
    const checkMatch = (e) => {
        e.preventDefault()
        data.forEach(thing => {
            if (thing.name === search.search) {
                setSearch({ ...search, result: thing })
            }
        })
    }
    return (

        <div>
            <Container>
                <FilloutStyles>
                    <Hint options={options}>
                        <input type="text" placeholder="Search" onChange={(e) => setSearch({ ...search, search: e.target.value })} />
                    </Hint>
                    <Button onClick={checkMatch}>Check</Button>
                    {search.result.name ?
                        <div>
                            <Card
                                title={search.result.name}
                                // TODO: create a note leaving ability to allow people taking
                                // to let the admin know any info about issues/damaged stock.
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
                        <div><h3>No Result Found</h3></div>}

                </FilloutStyles >
            </Container>
        </div>
    )
}

