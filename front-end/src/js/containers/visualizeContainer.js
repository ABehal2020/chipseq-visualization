import React, { useReducer, useState } from 'react';
import visualizeReducer from '../reducers/visualizeReducer';
import { visualizeAction, startSpinner } from '../actions/visualizeAction';
import { Col, Form, Input, Button, Checkbox, Spin } from 'antd';
import { HeatMapContainer } from '../containers/heatmapContainer';
import { v4 as uuidv4 } from 'uuid';
import './visualizeContainer.scss';

export const VisualizeContainer = () => {
    let initialState = {
        loading: false,
        error: false,
        server_message: "",
        submission_data: {
            "name": "ASP",
            "type": "sv",
            "experimentName": "test10",
            "x": "https://www.encodeproject.org/search/?searchTerm=H3K4ME3&type=Experiment&replication_type=isogenic&assembly=GRCh38&award.rfa=ENCODE4&format=json"
        }
    }

    // const [encodeLink, setEncodeLink] = useState("https://www.encodeproject.org/search/?searchTerm=H3K4ME3&type=Experiment&replication_type=isogenic&assembly=GRCh38&award.rfa=ENCODE4&format=json");
    const [encodeLink, setEncodeLink] = useState("https://www.encodeproject.org/search/?searchTerm=H3K4ME3&type=Experiment&replication_type=isogenic&award.rfa=ENCODE4&assay_title=Histone+ChIP-seq&assembly=GRCh38&format=json");

    let randExpName = uuidv4();
    console.log("rand exp name")
    console.log(randExpName);

    const [experimentName, setExperimentName] = useState(randExpName);

    const [assemblyName, setAssemblyName] = useState("GRCh38");

    const [fileInputName, setFile] = useState("bed");

    const [outputType, setOutputType] = useState("replicated peaks");

    console.log(encodeLink);

    const [{ loading, error, submission_data }, dispatch] = useReducer(visualizeReducer, initialState);

    const handleChangeLink = (event) => {
        console.log("handle change link");
        console.log(event.currentTarget.value);
        setEncodeLink(event.currentTarget.value);
    }

    const handleChangeExp = (event) => {
        console.log("handle change experiment");
        console.log(event.currentTarget.value);
        setExperimentName(event.currentTarget.value);
    }

    const handleChangeAssembly = (event) => {
        console.log("handle change assembly");
        console.log(event);
        setAssemblyName(event);
    }

    const handleChangeFile = (event) => {
        console.log("handle change file");
        console.log(event);
        setFile(event);
    }

    const handleChangeOutputType = (event) => {
        console.log("handle change output type");
        console.log(event);
        setOutputType(event);
    }

    const inputSave = () => {
        console.log("start submission");
        const submittedLink = encodeLink;
        const submittedExp = experimentName;
        const subbmittedAssembly = assemblyName;
        const submittedFile = fileInputName;
        const submittedOutputType = outputType;
        console.log(submittedLink);
        console.log(submittedExp);
        console.log("submitted file type");
        console.log(submittedFile);
        console.log("end")
        console.log(dispatch);
        startSpinner(dispatch);
        visualizeAction(dispatch, submittedLink, submittedExp, subbmittedAssembly, submittedOutputType, submittedFile);
    }

    let testLoading = true;

    let disableStatus = false;

    let dynamicClass = "v-hide";

    if (loading == true) {
        dynamicClass = "v-hide";
        disableStatus = true;
    } else {
        dynamicClass = "v-show";
        disableStatus = false;
    }

    return (
        <div className="disable-edit">
            <Spin tip="Loading..." spinning={loading} size="large">
            </Spin>
            <Col span={4} className="col-md-2"></Col>
            <Col span={20} className="col-md-10" >
                <Form>
                    <Form.Item label="Encode Link" name="encodeLink">
                        <Input value={encodeLink} onChange={handleChangeLink}></Input>
                    </Form.Item>
                    <Form.Item label="Unique Job ID - Please save this for future reference" name="experimentName">
                        <Input value={experimentName} disabled={true}></Input>
                    </Form.Item>
                    <Form.Item label="Assembly Type" name="assembly">
                        <Checkbox.Group defaultValue={["GRCh38"]} onChange={handleChangeAssembly}>
                            <Checkbox value="GRCh38">GRCh38</Checkbox>
                            <Checkbox value="hg19">hg19</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item label="File Input Format" name="fileInputFormat">
                        <Checkbox.Group defaultValue={["bed"]} onChange={handleChangeFile}>
                            <Checkbox value="bed">Bed</Checkbox>
                            <Checkbox value="bigBed">Big Bed</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    {/*
                    <Form.Item label="Default File Format" name="bedFileFormat">
                        <p>bed narrowPeak</p>
                    </Form.Item>
                    */}
                    <Form.Item label="Output Type" name="output">
                        <Checkbox.Group defaultValue={["replicated peaks"]} onChange={handleChangeOutputType}>
                            <Checkbox value="peaks">Individual Peaks</Checkbox>
                            <Checkbox value="replicated peaks">Replicated Peaks</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={disableStatus} onClick={inputSave}>Submit</Button>
                    </Form.Item>
                </Form>
                <div className={dynamicClass}>
                    <HeatMapContainer></HeatMapContainer>
                </div>
            </Col>
        </div>
    )
}