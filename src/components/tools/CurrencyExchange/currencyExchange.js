import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import './currencyExchange.css'
import { Button, Dropdown, Popover, OverlayTrigger, ButtonGroup, InputGroup, FormControl, Spinner } from 'react-bootstrap'
import CurrencyExChart from './currencyExchangeChart'
import filterIcon from './curEx-icon/filter-icon.svg'

const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        This widget fetches the latest exchange rate for given currencies from API provided by 
        <a href='https://exchangerate.host/#/' target='_blank'>exchangerate.host</a>
      </Popover.Body>
    </Popover>
  );

const getChartData = (from_unit, to_unit, rate) => {
    let year_rate
    let larger = from_unit
    let smaller = to_unit
    let today = new Date();
    let start_date = `${today.getFullYear() - 1}-${today.getMonth() + 1}-${today.getDate()}`
    let end_date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

    // https://api.exchangerate.host/timeseries?start_date=2020-12-29&end_date=2021-12-29&base=USD&symbols=VND

    if (rate < 1) [smaller, larger] = [larger, smaller];

    const timeSeriesUrl = `https://api.exchangerate.host/timeseries?start_date=${start_date}&end_date=${end_date}&base=${larger}&symbols=${smaller}`

    console.log(timeSeriesUrl)

    axios.get(timeSeriesUrl).then((response) => { year_rate = response.rates })

    

}

const CurrencyExchangeWidget = () => {
    const [error, setError] = useState(null);

    const [countryList, setCountryList] = useState({})
    const [keys, setKey] = useState(new Map());

    const [from_unit, setFrom] = useState("VND");
    const [to_unit, setTo] = useState("USD")

    const [rate, setRate] = useState()

    const [from_unit_filter, setFilterFrom] = useState("")
    const [to_unit_filter, setFilterTo] = useState("")

    const [amount, setAmount] = useState()
    const [res, setRes] = useState("")

    const symbolUrl = 'https://api.exchangerate.host/symbols'
    const apiUrl = `https://api.exchangerate.host/convert?from=${from_unit}&to=${to_unit}`
    
    useEffect(() => {
        axios.get(symbolUrl)
            .then(
                (response) => {
                    setCountryList(response.data.symbols)
                    setKey(Object.keys(response.data.symbols))
                },
                (error) => {
                    setError(error);
                  }
            )
    }, [])

    useEffect(() => {
        axios.get(apiUrl)
          .then(
            (response) => {
              setRate(response.data.info.rate)
            },
            (error) => {
                setError(error);
              }
          )
      }, [from_unit, to_unit]);

    return (
    <div>
        <div className='widget-info'>
            <h2 className='h2-tools'>Currency Exchange</h2>
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <button className='widget-i'></button>
            </OverlayTrigger>
        </div>

        {countryList && keys && rate && !error ? (
        <div>
 
        <div className='ce-dropdown-group'>

            <div className='ce-dropdown-from'>

                <div>Base currency:</div>
                <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle variant="outline-secondary" className="ce-dropdown-custom-1">{from_unit}</Dropdown.Toggle>
                <Dropdown.Menu className="ce-dropdown-menu">  
                    <div className='ce-search-bar-group'> 
                    <Dropdown.Divider/>
                        <form className='search-bar-ce'>
                        <img src={filterIcon} height='30px' width='30px' className='filter-icon'/>
                            <label>
                                <input type="text" onChange={(event) => {setFilterFrom(event.target.value.toUpperCase())}} className='input-search-bar-ce' />
                            </label>
                        </form>

                    <Dropdown.Divider/>

                    </div>

                    {keys.map((key, index) => {
                    if (from_unit_filter === "" || key.startsWith(from_unit_filter) || countryList[key].description.toUpperCase().includes(from_unit_filter))
                    return(
                        <Dropdown.Item onClick={() => {setFrom(key)}} className='ce-dropdown-item'>{(`${key}  (${countryList[key].description})`)}</Dropdown.Item>);
                    })}
                </Dropdown.Menu>
                </Dropdown>

            </div>

        <br/>

            <div className='ce-dropdown-to'>

                <div>Target currency:</div>
                <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle variant="outline-secondary" className="ce-dropdown-custom-2">{to_unit}</Dropdown.Toggle>
                <Dropdown.Menu className="ce-dropdown-menu">
                    <div className='ce-search-bar-group'> 
                        <Dropdown.Divider/>
                        <form className='search-bar-ce'>
                            <img src={filterIcon} height='30px' width='30px' className='filter-icon'/>
                            <label>
                            <input type="text" onChange={(event) => {setFilterTo(event.target.value.toUpperCase())}} className='input-search-bar-ce'/>
                            </label>
                        </form>

                        <Dropdown.Divider/>
                    </div>

                    { keys.map((key, index) => {
                    if (to_unit_filter === "" || key.startsWith(to_unit_filter) || countryList[key].description.toUpperCase().includes(to_unit_filter))
                    return(
                        <Dropdown.Item onClick={() => {setTo(key)}}>{(`${key}  (${countryList[key].description})`)}</Dropdown.Item>);
                    })}


                </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        <br />

        <div className='ce-input-box-group'> 
        <InputGroup onChange={(event) => setAmount(parseFloat(event.target.value))} className='ce-input-box'>
            <FormControl id='ce-form-control'
            placeholder="Enter amount"/>
            <InputGroup.Text >{from_unit}</InputGroup.Text>
        </InputGroup>

        <div className='ce-button-group'>
        <Button variant="outline-secondary" className='ce-button-convert' onClick={() => {
            getChartData(from_unit, to_unit, rate)
            console.log(`Converting from ${from_unit} to ${to_unit} and the rate is ${rate}`)
            Number.isInteger(amount) ? setRes((amount * rate).toLocaleString('en-US', { maximumFractionDigits: 2 })) : setRes("Please enter a numeric value")
        }}>Convert</Button>

        <Button variant="outline-secondary" className='ce-button-clear' onClick={() => {
            setRes(''); document.getElementById('ce-form-control').value = ''
        }}>Clear</Button>

        </div>

          <InputGroup className='ce-input-box'>
            <FormControl disabled={true} value={res}/>
            <InputGroup.Text >{to_unit}</InputGroup.Text>
        </InputGroup>

        </div> 

        <CurrencyExChart/>

        </div>

        ) : (<Spinner animation="border" id='ww-spinner'/> )
    }

    </div>

    );
}


export default CurrencyExchangeWidget;
