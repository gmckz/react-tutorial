import { useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    
    //every time the component renders execute code in useEffect
    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout( () => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if(!res.ok) {
                        throw Error('could not fetch the data for that resource')
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    setData(data)
                    setIsLoading(false)
                    setError(null)
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted')
                    } else {
                    setError(err.message)
                    setIsLoading(false)
                    }
                })
        }, 1000)

        return () => abortCont.abort();
    }, [url]) // [] is a dependency array, an empty one means useEffect only runs for first render,
            // further state changes do not cause re-rendering
            //now with name in the dependency array, when the state of name changes useEffect will trigger
    return { data, isLoading, error }
}

export default useFetch;