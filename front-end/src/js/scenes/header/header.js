import React from 'react';
import {Layout, Row, Col} from 'antd';
import Clock from '../../components/clock/clock';
import './header.scss';

const Header = () => {
    const mystyle = {
        color: "#fff",
        height: "55px",
        lineHeight: "55px",
        padding: "0 1.5em",
        backgroundColor: "#1a4372",
    }

    return (
        <Layout.Header className="top-navbar" style={mystyle}>
            <Row>
                <Col span={8} className="top-navbar-biz-n-app">
                    <Clock></Clock>
                </Col>
                <Col span={8} className="top-navbar-env-select">
                <span>ENCODE ChIP-Seq Data Visualization Tool</span>
                </Col>
                <Col span={8} className="top-navbar-migrate">
                    <span>Welcome!</span>
                </Col>
            </Row>
        </Layout.Header>
    )
}

export default Header;