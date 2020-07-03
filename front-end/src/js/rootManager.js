import React, {useContext, useEffect, useCallback, lazy, Suspense} from 'react';
import {Layout} from 'antd';
import Header from './scenes/header/header';
import RootContainer from './containers/rootContainer';
import {usePrevious} from './utils/usePrevious';
import {Store} from './store/Store';
import DefaultBack from './components/defaultBack/defaultBack';
import LoadingPage from './scenes/loadingPage/loadingPage';

const LazyOverviewPage = lazy(() => import('./scenes/pages/overview/overview'));
const LazyDemoPage = lazy(() => import('./scenes/pages/demo/demo'));
const LazyVisualizePage = lazy(() => import('./scenes/pages/visualize/visualize'));

const RootManager = () => {
    const {
        state: {
           
            cherryUser,
            departments,
            navigation: {  page, env }
        },
        dispatch
    } = useContext(Store);

    const prev = usePrevious({ env});

    const updatefilteredDepartments = useCallback(() => {
        console.log('updatefilters called ');
    }, [prev,  env, dispatch]);

    const januCB = useCallback(() => {
        console.log("call back");
        console.log(cherryUser);
        console.log(departments);
        console.log(dispatch);


    }, [cherryUser,  dispatch, departments, env]);

    useEffect(() => {
        console.log("step 1");
        januCB();
    }, [januCB]);


    useEffect(() => {
        console.log("step 2");
        updatefilteredDepartments();
    }, [updatefilteredDepartments]);

    const getLazyMenu = (menuName) => {
        switch (menuName) {
            case "Overview":
                return (<LazyOverviewPage></LazyOverviewPage>);
            case "Demo":
                return (<LazyDemoPage></LazyDemoPage>);
            case "Visualize":
                return (<LazyVisualizePage></LazyVisualizePage>);
            default: 
                
                return (<LazyOverviewPage></LazyOverviewPage>);
        }
    }

    return (
        <Layout>
            <Header></Header>
            <RootContainer>
                <Suspense fallback={<LoadingPage></LoadingPage>}>
                    {getLazyMenu(page)}
                </Suspense>
            </RootContainer>
        </Layout>
    )
}

export default RootManager;