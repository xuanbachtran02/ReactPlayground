import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import './currencyExchange.css'
import { DropdownButton, Dropdown, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import currency_symbol from './currency_symbols.json'
import filterIcon from './curEx-icon/filter-icon.svg'

const keys = Object.keys(currency_symbol);

const popover = (
    <Popover id="popover-basic">
      {/* <Popover.Header>Currency Exchange Widget</Popover.Header> */}
      <Popover.Body>
        This widget fetches the latest exchange rate for given currencies from API provided by <a href='https://exchangerate.host/#/' target='_blank'>exchangerate.host</a>
      </Popover.Body>
    </Popover>
  );

const CurrencyExchangeWidget = () => {
    const [from_unit, setFrom] = useState("VND");
    const [to_unit, setTo] = useState("USD")
    const [from_unit_filter, setFilterFrom] = useState("")
    const [to_unit_filter, setFilterTo] = useState("")
    const [amount, setAmount] = useState()
    const [res, setRes] = useState("")
    const [rate, setRate] = useState()

    const apiUrl = `https://api.exchangerate.host/convert?from=${from_unit}&to=${to_unit}`

    useEffect(() => {
        axios.get(apiUrl)
          .then(
            (response) => {
              console.log(`${from_unit} to ${to_unit}: ${response.data.info.rate}`)
              setRate(response.data.info.rate)
            },
          )
      }, [apiUrl]);

    return (
    <div>
        <div className='widget-info'>
            <h2 className='h2-tools'>Currency Exchange</h2>
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <button className='widget-i'></button>
            </OverlayTrigger>
        </div>

        <div className='dropdown-group'>

            <div className='ce-dropdown-from'>

                <div>Base currency:</div>
                <DropdownButton title={from_unit} variant="outline-secondary" >
                    <form className='search-bar-ce'>
                    <img src={filterIcon} height='30px' width='30px' className='filter-icon'/>
                        <label>
                            <input type="text" onChange={(event) => {setFilterFrom(event.target.value.toUpperCase())}} className='input-search-bar-ce' />
                        </label>
                    </form>

                    <Dropdown.Divider/>

                    {keys.map((key, index) => {
                    if (from_unit_filter === "" || key.startsWith(from_unit_filter) || currency_symbol[key].description.toUpperCase().includes(from_unit_filter))
                    return(
                        <Dropdown.Item onClick={() => setFrom(key)}>{(`${key}  (${currency_symbol[key].description})`)}</Dropdown.Item>);
                    })}

                </DropdownButton>

            </div>

        <br/>

            <div className='ce-dropdown-to'>

                <div>Target currency:</div>

                <DropdownButton title={to_unit} variant="outline-secondary">
                    <form className='search-bar-ce'>
                        <img src={filterIcon} height='30px' width='30px' className='filter-icon'/>
                        <label>
                        <input type="text" onChange={(event) => {setFilterTo(event.target.value.toUpperCase())}} className='input-search-bar-ce'/>
                        </label>
                    </form>

                    <Dropdown.Divider/>

                    { keys.map((key, index) => {
                    if (to_unit_filter === "" || key.startsWith(to_unit_filter) || currency_symbol[key].description.toUpperCase().includes(to_unit_filter))
                    return(
                        <Dropdown.Item onClick={() => setTo(key)}>{(`${key}  (${currency_symbol[key].description})`)}</Dropdown.Item>);
                    })}

                </DropdownButton>
            </div>

        </div>

        <br />

        <div> 
          <input type="text/value" placeholder=" Enter amount" onChange={(event) => setAmount(parseFloat(event.target.value))} className='input-box'/> 
          <button onClick={() => {
            isNaN(amount) ? setRes(" Please enter a numeric value") : setRes((amount * rate).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " " + to_unit)
              }}>Enter</button> 
          
          <br /> <br />

          Converted amount: <input disabled={true} value={res} className='input-box'/>
        </div> 
    </div>

    );
}


export default CurrencyExchangeWidget;
