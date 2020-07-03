import React, { useEffect, useReducer, useCallback, useState } from 'react';
import heatmapReducer from '../reducers/heatmapReducer';
import MyHeatMap from '../components/heatmap/heatmap';
import { loadMapAction } from '../actions/heatmapAction';
import { Form, Input, Button } from 'antd';
import './heatmapContainer.scss';

export const HeatMapContainer = (props) => {
    let initialState = {
        loading: false,
        error: false,
        correlations_data: [
            {
                "experimentName": "test9",
                "rowNum": 0,
                "colNum": 0,
                "rowLabel": "ENCFF017NXL.bed.gz",
                "colLabel": "ENCFF017NXL.bed.gz",
                "corrValue": 1
            },
            {
                "experimentName": "test9",
                "rowNum": 0,
                "colNum": 1,
                "rowLabel": "ENCFF017NXL.bed.gz",
                "colLabel": "ENCFF071XMA.bed.gz",
                "corrValue": 0.401480573670878
            },
            {
                "experimentName": "test9",
                "rowNum": 0,
                "colNum": 2,
                "rowLabel": "ENCFF017NXL.bed.gz",
                "colLabel": "ENCFF106NXV.bed.gz",
                "corrValue": 0.653801541642514
            }]
    }

    let ar = [
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 0,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 1,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.401480573670878
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 2,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.653801541642514
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 3,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.632132301951775
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 4,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.775291219039003
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 5,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.593734494287072
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 6,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.820793318492966
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 7,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.672334650163334
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 8,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.613253910779165
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 9,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.631049487968915
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 10,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.665625494891329
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 11,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.611139456943434
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 12,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.640868754004641
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 0,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.401480573670878
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 1,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 2,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.373981563179797
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 3,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.394739557828355
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 4,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.344997704881801
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 5,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.539304882286069
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 6,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.39049553467471
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 7,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.355027951624418
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 8,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.554423472586598
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 9,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.346057686300162
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 10,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.469015850569048
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 11,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.342153690497269
        },
        {
            "experimentName": "test9",
            "rowNum": 1,
            "colNum": 12,
            "rowLabel": "ENCFF071XMA.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.476505104095468
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 0,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.653801541642514
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 1,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.373981563179797
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 2,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 3,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.692749223160436
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 4,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.652903992357182
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 5,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.598357758444695
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 6,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.638051635441029
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 7,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.668588037007729
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 8,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.596869671191305
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 9,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.731279120142359
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 10,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.656570496998315
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 11,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.696307456961749
        },
        {
            "experimentName": "test9",
            "rowNum": 2,
            "colNum": 12,
            "rowLabel": "ENCFF106NXV.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.638984329387451
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 0,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.632132301951775
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 1,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.394739557828355
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 2,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.692749223160436
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 3,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 4,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.614344800212669
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 5,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.629804479940922
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 6,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.613597699891213
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 7,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.642715492699096
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 8,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.613653222350719
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 9,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.703577692436213
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 10,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.650390071000968
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 11,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.651707452498069
        },
        {
            "experimentName": "test9",
            "rowNum": 3,
            "colNum": 12,
            "rowLabel": "ENCFF125JFQ.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.641854556676146
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 0,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.775291219039003
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 1,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.344997704881801
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 2,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.652903992357182
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 3,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.614344800212669
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 4,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 5,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.539424453989427
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 6,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.776713477534916
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 7,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.679430752579228
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 8,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.546878887173198
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 9,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.643548506470375
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 10,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.617236956934302
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 11,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.619202752976043
        },
        {
            "experimentName": "test9",
            "rowNum": 4,
            "colNum": 12,
            "rowLabel": "ENCFF137YUF.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.59263733040592
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 0,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.593734494287072
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 1,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.539304882286069
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 2,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.598357758444695
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 3,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.629804479940922
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 4,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.539424453989427
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 5,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 6,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.573244649048153
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 7,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.562405821370581
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 8,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.720307235395242
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 9,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.570483709340528
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 10,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.682403118254642
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 11,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.546382378968886
        },
        {
            "experimentName": "test9",
            "rowNum": 5,
            "colNum": 12,
            "rowLabel": "ENCFF141BCE.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.67768180766748
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 0,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.820793318492966
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 1,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.39049553467471
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 2,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.638051635441029
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 3,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.613597699891213
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 4,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.776713477534916
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 5,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.573244649048153
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 6,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 7,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.669498457008237
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 8,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.593916114025107
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 9,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.618136225541737
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 10,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.647450111208374
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 11,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.599027558253479
        },
        {
            "experimentName": "test9",
            "rowNum": 6,
            "colNum": 12,
            "rowLabel": "ENCFF155USN.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.627331110877431
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 0,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.672334650163334
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 1,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.355027951624418
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 2,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.668588037007729
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 3,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.642715492699096
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 4,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.679430752579228
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 5,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.562405821370581
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 6,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.669498457008237
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 7,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 8,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.581395618606724
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 9,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.674830151299944
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 10,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.708165821633782
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 11,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.628889643773344
        },
        {
            "experimentName": "test9",
            "rowNum": 7,
            "colNum": 12,
            "rowLabel": "ENCFF384IAN.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.640836950501893
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 0,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.613253910779165
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 1,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.554423472586598
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 2,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.596869671191305
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 3,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.613653222350719
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 4,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.546878887173198
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 5,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.720307235395242
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 6,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.593916114025107
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 7,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.581395618606724
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 8,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 9,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.561832671923739
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 10,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.719577214452087
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 11,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.539698334073843
        },
        {
            "experimentName": "test9",
            "rowNum": 8,
            "colNum": 12,
            "rowLabel": "ENCFF460EIG.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.781062732386115
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 0,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.631049487968915
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 1,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.346057686300162
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 2,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.731279120142359
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 3,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.703577692436213
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 4,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.643548506470375
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 5,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.570483709340528
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 6,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.618136225541737
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 7,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.674830151299944
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 8,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.561832671923739
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 9,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 10,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.631394502155142
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 11,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.675938539948081
        },
        {
            "experimentName": "test9",
            "rowNum": 9,
            "colNum": 12,
            "rowLabel": "ENCFF631WQJ.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.612465221367349
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 0,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.665625494891329
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 1,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.469015850569048
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 2,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.656570496998315
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 3,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.650390071000968
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 4,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.617236956934302
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 5,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.682403118254642
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 6,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.647450111208374
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 7,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.708165821633782
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 8,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.719577214452087
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 9,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.631394502155142
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 10,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 11,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.595319971510049
        },
        {
            "experimentName": "test9",
            "rowNum": 10,
            "colNum": 12,
            "rowLabel": "ENCFF764NQG.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.726570928986417
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 0,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.611139456943434
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 1,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.342153690497269
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 2,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.696307456961749
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 3,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.651707452498069
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 4,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.619202752976043
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 5,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.546382378968886
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 6,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.599027558253479
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 7,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.628889643773344
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 8,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.539698334073843
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 9,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.675938539948081
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 10,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.595319971510049
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 11,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 11,
            "colNum": 12,
            "rowLabel": "ENCFF871JIL.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 0.583254827626529
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 0,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 0.640868754004641
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 1,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.476505104095468
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 2,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.638984329387451
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 3,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF125JFQ.bed.gz",
            "corrValue": 0.641854556676146
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 4,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF137YUF.bed.gz",
            "corrValue": 0.59263733040592
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 5,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF141BCE.bed.gz",
            "corrValue": 0.67768180766748
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 6,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF155USN.bed.gz",
            "corrValue": 0.627331110877431
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 7,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF384IAN.bed.gz",
            "corrValue": 0.640836950501893
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 8,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF460EIG.bed.gz",
            "corrValue": 0.781062732386115
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 9,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF631WQJ.bed.gz",
            "corrValue": 0.612465221367349
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 10,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF764NQG.bed.gz",
            "corrValue": 0.726570928986417
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 11,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF871JIL.bed.gz",
            "corrValue": 0.583254827626529
        },
        {
            "experimentName": "test9",
            "rowNum": 12,
            "colNum": 12,
            "rowLabel": "ENCFF903QKE.bed.gz",
            "colLabel": "ENCFF903QKE.bed.gz",
            "corrValue": 1
        }
    ];

    const [{ loading, error, correlations_data }, dispatch] = useReducer(heatmapReducer, initialState);

    const mapCB = useCallback(() => {
        console.log('Step 2 - react call back fired');
        loadMapAction(dispatch);
    }, [dispatch])

    useEffect(() => {
        console.log('Step 1 - react use effect executed');
        mapCB();
    }, [mapCB]);

    const round = (value, decimals) => {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    const getCorrelationsData = () => {
        let formatted_data = [];
        if (!correlations_data) {
            console.log("null correlations data")
            return formatted_data;
        }
        for (var i = 0; i < correlations_data.length; i++) {
            let correlation = correlations_data[i]["corrValue"];
            let correlationRounded = round(correlation, 3);
            formatted_data.push([correlations_data[i]["rowNum"], correlations_data[i]["colNum"], correlationRounded]);
        }
        return formatted_data;
    }

    const getLabelsData = () => {
        let labels = [];
        if (!correlations_data) {
            console.log("null correlations data");
            return labels;
        }
        for (var i = 0; i < Math.sqrt(correlations_data.length); i++) {
            console.log(i);
            labels.push(correlations_data[i]["colLabel"]);
        }
        return labels;
    }

    const [experimentName, setExperimentName] = useState("samplerun");

    const handleChangeExp = (event) => {
        console.log("handle change experiment");
        console.log(event.currentTarget.value);
        setExperimentName(event.currentTarget.value);
    }

    const inputSave = () => {
        console.log("start submission");
        const submittedExp = experimentName;
        console.log(submittedExp);
        console.log(dispatch);
        loadMapAction(dispatch, submittedExp);
    }

    return (
        <div>
            <div className={props.dynamicClass}>
                <Form>
                    <Form.Item label="Look Up Heatmap Results By Unique Job ID" name="experimentName">
                        <Input value={experimentName} onChange={handleChangeExp}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={inputSave}>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
            <MyHeatMap correlations={getCorrelationsData()} labels={getLabelsData()}></MyHeatMap>
        </div>
    )
}