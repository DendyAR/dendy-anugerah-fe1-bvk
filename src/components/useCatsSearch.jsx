import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useCatsSearch(query , pageNumber) {
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(false)
    const [cats , setCats] = useState([])
    const [hasMore, setHasmore] = useState(false)
    

    useEffect(() => {
        setCats([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancle
        axios({
            headers: 'Content-Type: application/json',
            method: 'GET',
            url: `https://api.thecatapi.com/v1/breeds/search`,
            params: {q: query, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancle = c)
        }).then(res => {
            setCats(res.data)
            setHasmore(res.data.length > 0)
            setLoading(false)
        }).catch(e => {
            if(axios.isCancel(e)) return
            setError(true)
        })
        return () => cancle()
    }, [query, pageNumber])


  return { loading , error, cats  , hasMore }
    
}
