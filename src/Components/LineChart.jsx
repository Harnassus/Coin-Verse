import React from 'react'
import { Col, Row, Typography } from 'antd'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);


const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {

    const coinPrice = []
    const coinTimeStamp = []

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[ i ].price);
    }

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimeStamp.push(new Date(coinHistory?.data?.history[ i ].timestamp).toLocaleDateString());
    }
    console.log(coinHistory);
    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    }

    return (
        <>
            <Row className="chart-header" >
                <Title level={2} className="chart-title" style={{
                color: '#E1D5D9',
                textAlign: 'center'
            }}>{coinName} Price Chart </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change" style={{
                color: '#E1D5D9',
                textAlign: 'center'
            }}>Change: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price" style={{
                color: '#E1D5D9',
                textAlign: 'center'
            }}>Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
};


export default LineChart