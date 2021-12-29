import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import './currencyExchange.css'
import { Button, Dropdown, Popover, OverlayTrigger, ButtonGroup, InputGroup, FormControl } from 'react-bootstrap'
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
    const [init_val, setInit] = useState("")

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
                    if (from_unit_filter === "" || key.startsWith(from_unit_filter) || currency_symbol[key].description.toUpperCase().includes(from_unit_filter))
                    return(
                        <Dropdown.Item onClick={() => setFrom(key)} className='ce-dropdown-item'>{(`${key}  (${currency_symbol[key].description})`)}</Dropdown.Item>);
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
                    if (to_unit_filter === "" || key.startsWith(to_unit_filter) || currency_symbol[key].description.toUpperCase().includes(to_unit_filter))
                    return(
                        <Dropdown.Item onClick={() => setTo(key)}>{(`${key}  (${currency_symbol[key].description})`)}</Dropdown.Item>);
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
            isNaN(amount) ? setRes("Please enter a numeric value") : setRes((amount * rate).toLocaleString('en-US', { maximumFractionDigits: 2 }))
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
    </div>

    );
}


export default CurrencyExchangeWidget;
