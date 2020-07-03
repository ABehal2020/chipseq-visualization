import React from 'react';
import {Spin} from 'antd';
import './loadingPage.scss';

const LoadingPage = () => {
    return (
        <div className="center">
            <Spin size="large"></Spin>
        </div>
        
    )
}

export default LoadingPage;