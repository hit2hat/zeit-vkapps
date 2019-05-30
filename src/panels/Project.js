import React from "react";
import { connect } from "react-redux";
import { resolveDeploymentState } from "../api";
import {Panel, PanelHeader, Group, Cell, Spinner} from "@vkontakte/vkui";
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

const Project = ({ id, project, deployments, deploymentLoaded, goBack, selectDeployment }) => (
    <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>{project.name}</PanelHeader>
        <Group title="Развертывания">
            {
                deploymentLoaded ?
                    deployments.map((deployment, key) => {
                        const createdAt = new Date();
                        createdAt.setTime(deployment.created);

                        const state = resolveDeploymentState(deployment.state);

                        return (
                            <Cell
                                expandable
                                key={key}
                                children={deployment.url}
                                indicator={<Counter type={state.color}>{state.text}</Counter>}
                                description={"Создано: " + createdAt.toLocaleString("ru-RU")}
                                onClick={() => selectDeployment(key)}
                            />
                        );
                    })
                    : <div style={{ paddingBottom: 15 }}><Spinner/></div>
            }
        </Group>
    </Panel>
);

const mapState = (state) => ({
    project: state.projects.activeProject,
    deployments: state.deployments.list,
    deploymentLoaded: state.deployments.isLoaded
});

const mapDispatch = (dispatch) => ({
    goBack: dispatch.navigator.goBack,
    selectDeployment: dispatch.deployments.selectDeployment
});

export default connect(mapState, mapDispatch)(Project);