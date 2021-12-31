import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'

export function useApi(url) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      (async () => {
        try {
        //   console.log('API is called')
          const response = await fetch(url)
          if (response.ok) {
            const json = await response.json()
            setData(json)
            setError(null)
          } else if (response.status === 404) {
            setError('Error')
          } else {
            setError('Error')
          }
        } catch (err) {
          setError('Error')
        }
  
        setLoading(false)
      })()
    }, [url])
  
    return [data, error, loading]
  }

export function LoadingAnimation() {
  return(<Spinner animation="border" id='ww-spinner'/>)
}