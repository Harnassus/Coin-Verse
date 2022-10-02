import React, { useEffect } from 'react'
import { useState } from 'react';

import { useGetCoinsQuery } from '../services/cryptoApi'


import millify from 'millify';
import { Link } from 'react-router-dom'
import { Card, Col, Row, Input } from 'antd';

const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 12 : 100;

  const { data: coinsList, isFetching } = useGetCoinsQuery(count);

  const [ coin, setCoin ] = useState(coinsList?.data?.coins);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ activeMobile, setActiveMobile ] = useState(true);
  const [ screenSize, setScreenSize ] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize();

    return () => window.removeEventListener('resize', handleResize)
  })

  useEffect(() => {
    if (screenSize > 500) {
      setActiveMobile(false);
    } else {
      setActiveMobile(true);
    }

  }, [ screenSize ]);


  useEffect(() => {
    const filteredData = coinsList?.data?.coins.filter((cryptos) => cryptos.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCoin(filteredData)
  }, [ coinsList, searchTerm ])

  if (isFetching) return '....loading'

  return (

    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search coin' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}

      {!simplified && (
        <Row gutter={[ 32, 32 ]} className='crypto-card-container'>

          {coin?.map((currency) => (

            <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  style={{
                    borderRadius: "5px",
                    overflow: "hidden"
                  }}
                  title={` ${currency.rank}. ${currency.name}`}
                  extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.name} />}
                  hoverable
                >
                  <p>Price: {millify(currency.price)}$</p>
                  <p>Market Cap: {millify(currency.marketCap)}$</p>
                  <p>Daily Exchange: {millify(currency.change)}</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
      {simplified && activeMobile ? (
        <div className='crypto-card-container'>

          {coin?.map((currency) => (

            <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  style={{
                    borderRadius: "5px",
                    overflow: "hidden"
                  }}
                  title={` ${currency.rank}. ${currency.name}`}
                  extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.name} />}
                  hoverable
                >
                  <p>Price: {millify(currency.price)}$</p>
                  <p>Market Cap: {millify(currency.marketCap)}$</p>
                  <p>Daily Exchange: {millify(currency.change)}</p>
                </Card>
              </Link>
            </Col>
          ))}
        </div>
      ) : (
        <Row gutter={[ 32, 32 ]} className=''>

          {coin?.map((currency) => (

            <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  style={{
                    borderRadius: "5px",
                    overflow: "hidden"
                  }}
                  title={` ${currency.rank}. ${currency.name}`}
                  extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.name} />}
                  hoverable
                >
                  <p>Price: {millify(currency.price)}$</p>
                  <p>Market Cap: {millify(currency.marketCap)}$</p>
                  <p>Daily Exchange: {millify(currency.change)}</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )
      }
    </>

  )
}

export default Cryptocurrencies