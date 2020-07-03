import React, { useReducer, useState } from 'react';
import { HeatMapContainer } from '../../../containers/heatmapContainer';
import { Col, Form, Input, Button, Checkbox } from 'antd';
import './demo.scss';

const Demo = (props) => {
    const [encodeLink, setEncodeLink] = useState("https://www.encodeproject.org/search/?searchTerm=H3K4ME3&type=Experiment&replication_type=isogenic&assembly=GRCh38&award.rfa=ENCODE4&format=json");

    return (
        <div>
            <h2>Demo</h2>
            <Col span={4} className="col-md-2"></Col>
            <Col span={20} className="col-md-10">
                <Form>
                    <Form.Item label="Encode Link" name="encodeLink">
                        <Input value={encodeLink} disabled="true"></Input>
                    </Form.Item>
                    <Form.Item label="Unique Job ID - Please save this for future reference" name="experimentName">
                        <Input value="samplerun" disabled="true"></Input>
                    </Form.Item>
                    <Form.Item label="Assembly Type" name="assembly">
                        <Checkbox.Group defaultValue={["GRCh38"]} disabled="true">
                            <Checkbox value="GRCh38">GRCh38</Checkbox>
                            <Checkbox value="hg19">hg19</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item label="Default File Format" name="bedFileFormat">
                        <p>bed narrowPeak</p>
                    </Form.Item>
                    <Form.Item label="Output Type" name="output">
                        <Checkbox.Group defaultValue={["replicated peaks"]} disabled="true">
                            <Checkbox value="peaks">Individual Peaks</Checkbox>
                            <Checkbox value="replicated peaks">Replicated Peaks</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled="true">Submit</Button>
                    </Form.Item>
                </Form>
                <div>
                    <HeatMapContainer></HeatMapContainer>
                </div>
            </Col>
        </div>
    )
}

export default Demo;