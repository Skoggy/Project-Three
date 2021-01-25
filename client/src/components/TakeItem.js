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
    const [option, setOption] = useState([])
    const [text, setText] = useState('')
    const { data, loader, error } = useFetch(stockURL)


    useEffect(() => {
        setOption(data)
    }, [data])


    let options = []
    option && option.forEach(thing => { options.push(thing.name) })


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
            <Hint options={options}>
                <input type="text" placeholder="Search" onChange={(e) => setSearch({ ...search, search: e.target.value })} />
            </Hint>



            <button onClick={checkMatch}>Check</button>
            <p>{search.result.name}</p>
            <p>{search.result.amount}</p>
        </form>
    )
}

