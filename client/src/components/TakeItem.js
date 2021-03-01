import { React, useState } from 'react';
import { useQuery } from 'react-query';
import { Hint } from 'react-autocomplete-hint';
import styled from 'styled-components'
import axios from 'axios';

const Container = styled.div`
display:grid;
justify-content:center;
align-items:center;
justify-items:center;
align-content:center;
grid-template-columns: 1fr;
padding: 30px;
margin: 30px;
box-shadow: 0px 3px 15px rgba(0,0,0,0.2);

input {
    height: 3rem;
    font-size: 2.5rem;
}

p {
    text-align:center;
    font-size: 30px;
}

@media(max-width: 1000px) {
    justify-items:center;
    button {
      width:75%;
    }
    input {
       
  }
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

export const TakeItem = () => {
    const stockURL = 'http://localhost:3001/api/stocks'
    const noteUrl = 'http://localhost:3001/api/stocknote'
    // search and the matching result
    const [search, setSearch] = useState({
        result: {},
        search: ''
    })
    const [note, setNote] = useState({
        note: '',
        sendNote: '',

    })
    const [takenMessage, setTakenMessage] = useState('')

    // used to get update the amount that is taken from stock
    const [amounts, setAmounts] = useState({
        uuid: '',
        amount: ''
    })

    const [noMatch, setNoMatch] = useState('')
    // fetches data from url


    const { isLoading, error, data } = useQuery('stockItems', () =>
        axios(stockURL))


    // pushes the names of all the stock into the options array to be used for autofill.
    let options = []
    !isLoading && data.data.forEach(thing => { options.push(thing.name) })


    // takes stock from database
    const takeStock = (e) => {
        e.preventDefault();
        const data = search.result.uuid
        const put = { amount: search.result.amount - amounts.amount }
        axios.put(`${stockURL}/${data}`, put).then((result) => {
            setTakenMessage(`You have taken ${amounts.amount} ${search.result.name} from stock`)
        })
    }

    // creates note from database
    const addNote = (e) => {
        e.preventDefault();
        const data = search.result.uuid
        const notes = { note: note.sendNote }
        axios.put(`${noteUrl}/${data}`, notes).then((result) => {
            setNote({ ...note, note: note.sendNote, sendNote: '' })

        })
    }
    // takes what is put in the amount to be updated.
    const onAmountChange = (e) => {
        e.persist();
        setAmounts({ ...amounts, amount: e.target.value })
    }

    const onNoteChange = (e) => {
        setNote({ ...note, sendNote: e.target.value })

    }

    // checks if there is a match.
    const checkMatch = (e) => {
        e.preventDefault()
        setTakenMessage('')
        setSearch({ ...search, result: {} })
        setNoMatch('No Match Found')
        data.forEach(thing => {
            if (thing.name === search.search) {
                setSearch({ ...search, result: thing })
                setNote({ ...note, note: thing.note })
            }
        })
    }
    return (

        <Container>
            {error && <div>Something has gone wrong here...</div>}
            <div>
                <Hint options={options}>
                    <input type="text" placeholder="Search" onChange={(e) => setSearch({ ...search, search: e.target.value })} />
                </Hint>
                <Button onClick={checkMatch}>Check</Button>
            </div>
            <div>
                {Object.entries(search.result).length ?
                    <div>
                        <div>
                            <p>Name: {search.result.name}</p>
                            <p>Amount Remaining: {search.result.amount - amounts.amount}</p>
                        </div>
                        <div>
                            <input type="number"
                                name="TakeStock"
                                id="TakeStock"
                                value={amounts.amount}
                                onChange={onAmountChange} />
                            <Button onClick={takeStock}>Take</Button>
                            <p>{takenMessage}</p>
                        </div>
                        <div>
                            <input type="text"
                                name='note'
                                id='note'
                                value={note.sendNote}
                                onChange={onNoteChange} />
                            <Button onClick={addNote}>Add Note</Button>
                            <p>{note.note}</p>
                        </div>
                    </div>
                    :
                    <div>{noMatch}</div>}
            </div>

        </Container >

    )
}

