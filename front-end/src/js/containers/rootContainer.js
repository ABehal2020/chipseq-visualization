import React, { useEffect, useCallback, useContext } from 'react';
import Navigation from '../components/shutter/shuttergate';
import { SIDE_MENU_OBJECT } from '../definitions/sideMenuObject';
import { showPageAction, showToggleDoorAction } from '../actions/navAction';
import { Store } from '../store/Store';
import { usePrevious } from '../utils/usePrevious';
import { Layout } from 'antd';
import './rootContainer.css';

const { Content } = Layout;

const RootContainer = (props) => {
    const showPage = (navKey) => {
        console.log(navKey);
        showPageAction(dispatch, navKey);
    }

    const toggleDoor = (navKey) => {
        console.log("handle nav click");
        showToggleDoorAction(dispatch, navKey);
    }

    const {
        state: {
            navigation: { shutterflyOpen, page, env, schema }
        },
        dispatch
    } = useContext(Store);

    const prev = usePrevious({  env });

    const updatefilteredDepartments = useCallback(() => {
        console.log('updatefilters called')
    }, [prev,  env, dispatch]);


    useEffect(() => {
        console.log('use effect');
        updatefilteredDepartments();
    }, [updatefilteredDepartments]);

    return (
        <Layout className="chip-details-wrapper">
            <div className="chip-details-sidenav-wrapper">
                <Navigation shutterflyOpen={shutterflyOpen} toggleDoor={toggleDoor} showPage={showPage} currentPage={page} menuItems={SIDE_MENU_OBJECT}></Navigation>
            </div>
            <Content className="chip-details-content-wrapper" style={{ backgroundColor: "#fff" }}>{props.children}</Content>
        </Layout>
    )
}

export default RootContainer;