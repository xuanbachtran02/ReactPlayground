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

export const monthNameToNumStr = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
"Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"}

export const monthNumtoName = {"01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun",
"07":"Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"}