import React from 'react';
import {Col} from 'antd';
import './overview.css';

const Overview = () => {
    return (
        <div>
            <Col span={6} className="col-md-3"></Col>
            <Col span={12} className="col-md-6">
                <h2>Overview</h2>
                <h3>Summary</h3>
                <p>
                    This ENCODE ChIP-Seq Visualization tool calculates correlations among bed files and displays them in an interactive heatmap.
                    The user can submit a link to a JSON file containing ChIP-Seq metadata from the ENCODE portal in the visualize tab.
                    For a sample of what the results look, please go to the demo tab.
                </p>
                <h3>How Correlations Are Calculated</h3>
                <p>
                    The user submits a link to a JSON file containing ChIP-Seq metadata from the ENCODE portal.
                    The Javascript library Axios handles REST APIs for the front end and posts the link to the back end.
                    The Python library Django handles REST APIs for the back end and gets the link.
                    After parsing through the JSON file containing ChiP-Seq metadata from the ENCODE portal, ENCSRs and ENCFFs json metadata files are obtained and further parsed.
                    <b> Bed files meeting these three criteria GRCh38 (assembly type), bed narrowPeak (file format), and replicated peaks (output type) are downloaded from the ENCODE AWS S3 buckets.
                    Using the Python library <a href="https://pyranges.readthedocs.io/en/latest/autoapi/pyranges/statistics/index.html?highlight=jaccard#pyranges.statistics.StatisticsMethods.jaccard" target="_blank">Pyranges</a>, the <a href="https://www.statisticshowto.com/jaccard-index/" target="_blank">jaccard correlation statistic</a> is calculated among all the unique pairs of all the bed files. </b>
                    AWS Lambda asynchronous invocations (one per unique pair of bed files) are used to decrease the calculation time and return the correlation value of the paired bed files.
                    The correlation values are stored in the postgres database.
                    Django posts the correlation values to the front end.
                    Axios gets the correlation values, and the JavaScript libraries React and Highcharts render the correlation values in an interactive heatmap.
                </p>
            </Col>
            <Col span={6} className="col-md-3"></Col>
        </div>
    )
}

export default Overview;