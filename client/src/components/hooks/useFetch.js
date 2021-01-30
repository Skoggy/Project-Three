import { useEffect, useState } from "react"
import axios from 'axios'

export function useFetch(url) {
    const [state, setState] = useState({
        loading: false,
        data: undefined,
        error: undefined
    });

    useEffect(() => {
        (async () => {
            setState({ ...state, loading: true })
            try {
                const { data } = await axios.get(url)
                setState({ loading: false, data, error: undefined })
            }
            catch (e) {
                setState({ loading: false, error: true, data: undefined })
            }
        })()
    }, [url])

    return {
        ...state, updateState: (item) => setState({ ...state, data: [...state.data, item] }),

    }
}