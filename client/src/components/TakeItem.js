import { React, useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { Hint } from 'react-autocomplete-hint';



export const TakeItem = () => {
    const stockURL = 'http://localhost:3001/api/stocks'
    // const [stocks, setStocks] = useState([])
    const [search, setSearch] = useState({
        result: {},
        search: ''
    })
    const [options, setOptions] = useState({})
    const [text, setText] = useState('')
    const { data, loader, error } = useFetch(stockURL)

    useEffect(() => {
        setOptions(data)
    }, [data])
    // options.forEach(option => console.log(option.name))
    // data.forEach(item => console.log(item.name))

    const checkMatch = (e) => {
        e.preventDefault()
        data.forEach(thing => {
            if (thing.name === search.search) {
                console.log(thing, 'match')
                setSearch({ ...search, result: thing })
            }
        })
    }
    return (
        <form>
            <input type="text" placeholder="Search" onChange={(e) => setSearch({ ...search, search: e.target.value })} />

            <Hint options={options}>
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)} />
            </Hint>
            <button onClick={checkMatch}>Check</button>
            <p>{search.result.name}</p>
            <p>{search.result.amount}</p>
        </form>
    )
}

