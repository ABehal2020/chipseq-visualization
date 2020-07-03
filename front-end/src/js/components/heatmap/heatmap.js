import React from 'react'
import _ from 'lodash'
import { } from 'highcharts/'
import Highcharts from 'highcharts'
import HeatMap from 'highcharts/modules/heatmap'
import HighchartsMore from 'highcharts/js/highcharts-more'

HighchartsMore(Highcharts)
HeatMap(Highcharts)

export default class MyHeatMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            experimentName: "test9"
        }
    }

    dataLocal = [[0, 0, 1], [0, 1, 0.5], [0, 2, 0.3],
    [1, 0, 0.7], [1, 1, 1], [1, 2, 0.8],
    [2, 0, 0.5], [2, 1, 0.5], [2, 2, 1]];

    displayHeatMapLocal = () => {
        var showHeatMap = Highcharts.chart("januheatmap", {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },
            title: {
                text: 'ChIP-Seq Jaccard Correlation Heatmap'
            },
            xAxis: {
                categories: ['File 1', 'File 2', 'File 3']
            },
            yAxis: {
                categories: ['File 1', 'File 2', 'File 3']
            },
            colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[0]
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },
            series: [{
                name: 'Jaccard Indices',
                borderWidth: 1,
                data: [[0, 0, 1], [0, 1, 0.5], [0, 2, 0.3],
                [1, 0, 0.7], [1, 1, 1], [1, 2, 0.8],
                [2, 0, 0.5], [2, 1, 0.5], [2, 2, 1]],
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]
        });
    }

    displayHeatMapChild = () => {
        var showHeatMap = Highcharts.chart("childmap", {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },
            title: {
                text: 'ChIP-Seq Jaccard Correlation Heatmap'
            },
            xAxis: {
                categories: ['File 1', 'File 2', 'File 3']
            },
            yAxis: {
                categories: ['File 1', 'File 2', 'File 3']
            },
            colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[0]
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },
            series: [{
                name: 'Jaccard Indices',
                borderWidth: 1,
                data: this.dataLocal,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]
        });
    }

    displayHeatMapParent = () => {
        var showHeatMap = Highcharts.chart("parentmap", {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },
            title: {
                text: 'ChIP-Seq Jaccard Correlation Heatmap'
            },
            xAxis: {
                categories: this.props.labels
            },
            yAxis: {
                categories: this.props.labels
            },
            colorAxis: {
                stops: [
                    [0, '#000099'],
                    [0.4, '#00ffff'],
                    [0.6, '#ffff66'],
                    [0.8, '#ff9900'],
                    [1, '#800000']
                ],
                min: 0
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },
            series: [{
                name: 'Jaccard Indices',
                borderWidth: 1,
                data: this.props.correlations,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]
        });
    }

    inputSave = () => {
        console.log("start submission");
    }

    handleChangeExp = (event) => {
        console.log("handle change experiment");
        console.log(event.currentTarget.value);
        const newValue = event.currentTarget.value;
        this.setState({
            experimentName: newValue
        });
    }

    render() {
        return (
            <div>
                <div className="row-fluid voffset2 svlist-mvevt-row sv-account-chart-container svmodelvalue-box" style={{ 'width': '100%', 'minwidth': '310px', 'padding-top': '20px', 'background-color': '#fff', 'margin': 0 }} id="parentmap"></div>
                <span onClick={this.displayHeatMapParent} className="glyphicon glyphicon-refresh" > Update</span>
            </div>
        )
    }
}