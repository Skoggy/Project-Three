import { React, useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';



export const TakeItem = () => {

    const stockURL = 'http://localhost:3001/api/stocks'

    const [stocks, setStocks] = useState([])
    const [search, setSearch] = useState({
        result: {},
        search: ''

    })

    const { data, loader, error } = useFetch(stockURL)
    console.log(data)


    useEffect(() => {
        setStocks(data)
    }, [data])

    function checkMatch(e) {
        e.preventDefault()
        data.forEach(thing => {
            if (thing.name === search.search) {
                console.log(thing, 'match')
                setSearch({ ...search, result: thing })
            }
        })
    }
    console.log(search)

    return (
        <form>
            <input type="text" placeholder="Search" onChange={(e) => setSearch({ ...search, search: e.target.value })} />

            <button onClick={checkMatch}>Check</button>
            <p>{search.result.name}</p>
        </form>
    )
}