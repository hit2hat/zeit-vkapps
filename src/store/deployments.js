import React from "react";
import { getDeploymentsByProject, getDeploymentById, getAliasesByDeployment, deleteDeployment } from "../api";
import { ScreenSpinner } from "@vkontakte/vkui";

const deployments = {
    state: {
        isLoaded: false,
        list: [],
        activeDeployment: null
    },
    reducers: {
        loading(state) {
            return { ...state, isLoaded: false };
        },
        loaded(state, payload) {
            return { list: payload, isLoaded: true, activeDeployment: null };
        },
        select(state, payload) {
            return { ...state, activeDeployment: payload };
        },
        delete(state, payload) {
            return { ...state, list: state.list.filter((deployment) => deployment.uid !== payload) };
        }
    },
    effects: (dispatch) => ({
        async load(project_id) {
            dispatch.deployments.loading();
            getDeploymentsByProject(project_id).then((result) => {
                dispatch.deployments.loaded(result);
            });
        },
        selectDeployment(deployment_id, state) {
            dispatch.navigator.setPopout(<ScreenSpinner/>);
            getDeploymentById(state.deployments.list[deployment_id].uid).then((deployment) => {
                getAliasesByDeployment(state.deployments.list[deployment_id].uid)
                    .then((aliases) => {
                        console.log(aliases);
                        dispatch.deployments.select({ ...deployment, alias: aliases });
                        dispatch.navigator.goForward("deployment");
                    });
            });
        },
        deleteDeployment(deployment_id) {
            dispatch.navigator.setPopout(<ScreenSpinner/>);
            deleteDeployment(deployment_id)
                .then((result) => {
                    if (result.state === "DELETED") {
                        dispatch.deployments.delete(deployment_id);
                        return dispatch.navigator.goBack();
                    } else {
                        dispatch.navigator.setPopout(null);
                    }
                })
                .catch(() => dispatch.navigator.setPopout(null));
        }
    })
};

export default deployments;