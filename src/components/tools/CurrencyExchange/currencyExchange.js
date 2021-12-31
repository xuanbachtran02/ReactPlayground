import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import { useApi, LoadingAnimation } from'../utils'
import GetChartData from './currencyExchangeChart'
import './currencyExchange.css'
import { Button, Dropdown, Popover, OverlayTrigger, ButtonGroup, InputGroup, FormControl, Spinner } from 'react-bootstrap'
import CurrencyExChart from './currencyExchangeChart'
import filterIcon from './curEx-icon/filter-icon.svg'

const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        This widget fetches the latest exchange rate for given currencies from API provided 
        by <a href='https://exchangerate.host/#/' target='_blank'>exchangerate.host</a>
      </Popover.Body>
    </Popover>
  );

const CurExWidgetInfo = () => {
    return (
        <div className='widget-info'>
            <h2 className='h2-tools'>Currency Exchange</h2>
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <button className='widget-i'></button>
            </OverlayTrigger>
        </div>
    )
}

const CurrencyExchangeWidget = () => {
    let countryList
    let keys
    let rate

    const [from_unit, setFrom] = useState("VND");
    const [to_unit, setTo] = useState("USD")

    const [from_unit_filter, setFilterFrom] = useState("")
    const [to_unit_filter, setFilterTo] = useState("")

    const [amount, setAmount] = useState()
    const [res, setRes] = useState("")

    const symbolUrl = 'https://api.exchangerate.host/symbols'
    const rateUrl = `https://api.exchangerate.host/convert?from=${from_unit}&to=${to_unit}`

    const [listData,  listError, listLoading] = useApi(symbolUrl)
    const [rateData, rateError, rateLoading] = useApi(rateUrl)
    
    if (listLoading || rateLoading || listError || rateError || !listData || !rateData) 
    return <LoadingAnimation/>

    countryList = listData.symbols
    keys = Object.keys(countryList)
    rate = rateData.info.rate

    return (
    <div>
        <CurExWidgetInfo/>

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
                                <input type="text" onChange={(event) => {setFilterFrom(event.target.value.toUpperCase())}} className='input-search-bar-ce' 
                                id='ce-filter-from'/>
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
                            <input type="text" onChange={(event) => {setFilterTo(event.target.value.toUpperCase())}} className='input-search-bar-ce' id='ce-filter-to'/>
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
            console.log(`Converting from ${from_unit} to ${to_unit} and the rate is ${rate}`)
            Number.isInteger(amount) ? setRes((amount * rate).toLocaleString('en-US', { maximumFractionDigits: 2 })) : setRes("Please enter a numeric value")
        }}>Convert</Button>

        <Button variant="outline-secondary" className='ce-button-clear' onClick={() => {
            setRes(''); setFilterFrom(''); setFilterTo('')
            const ce_clear_id = ['ce-form-control', 'ce-filter-from', 'ce-filter-to']
            for(let i in ce_clear_id){
                if (document.getElementById(ce_clear_id[i]))
                    document.getElementById(ce_clear_id[i]).value = ''
                }
        }}>Clear</Button>

        </div>

          <InputGroup className='ce-input-box'>
            <FormControl disabled={true} value={res}/>
            <InputGroup.Text >{to_unit}</InputGroup.Text>
        </InputGroup>

        </div> 

        <CurrencyExChart unit_1={from_unit} unit_2={to_unit} rate={rate}/>

        </div>

    </div>

    );
}


export default CurrencyExchangeWidget;
