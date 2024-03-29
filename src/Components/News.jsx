import React, { useState, useEffect } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetNewsQuery } from '../services/cryptoNewsApi'
import { useGetCoinsQuery } from '../services/cryptoApi'

const { Text, Title } = Typography;
const { Option } = Select;

 let demoDisplayImage = 'https://unsplash.com/photos/yJpjLD3c9bU'

const News = ({ simplified }) => {

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const { data: cryptoNews } = useGetNewsQuery({ newsCategory, count: simplified ? 6 : 12 })
  const { data } = useGetCoinsQuery(100);
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

  if (!cryptoNews?.value) return "Loading.....";
  

  return (
    <Row gutter={[ 24, 24 ]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder="Select a Coin"
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0}
          >
            <Option value='Cryptocurrency'>{newsCategory.value}</Option>
            {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {simplified && activeMobile ? (
         <div className="crypto-card-container">
          {cryptoNews.value.map((news, i) => (
            <Col xs={24} sm={12} lg={8} className="news-container" key={i}>
              <Card hoverable className="news-card">
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>{news.name }</Title>
                    <img style={{ maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoDisplayImage} alt='News' />
                  </div>
                  <p>
                    { news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar src={news.provider[ 0 ]?.image?.thumbnail?.contentUrl || demoDisplayImage} />
                      <Text className="provider-name">{news.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
          ))}
        </div>
        ) : (
          <div className="news">
                  {cryptoNews.value.map((news, i) => (
                      <Col xs={24} sm={12} lg={8} className="news-container" key={i}>
                        <Card hoverable className="news-card">
                          <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                              <Title className="news-title" level={4}>{news.name }</Title>
                            </div>
                            <p>
                              { news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                            </p>
                            <div className="provider-container">
                              <div>
                                <Avatar src={news.provider[ 0 ]?.image?.thumbnail?.contentUrl || demoDisplayImage} />
                                <Text className="provider-name">{news.provider[0]?.name}</Text>
                              </div>
            
                            </div>
                          </a>
                        </Card>
                      </Col>
                  ))}
            </div>
       )
      }
    </Row>
  )
}

export default News