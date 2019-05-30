import React from "react";
import { connect } from "react-redux";
import { resolveDeploymentState } from "../api";
import FireOpener from "../fire-opener";
import {Panel, PanelHeader, Group, Cell} from "@vkontakte/vkui";
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

const Deployment = ({ id, deployment, goBack }) => {
    const state = resolveDeploymentState(deployment.readyState);
    const createdAt = new Date();

    createdAt.setTime(deployment.createdAt);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>{deployment.name}</PanelHeader>
            <Group title="Основная информация">
                <Cell
                    expandable
                    children="Основной URL"
                    indicator={deployment.url}
                    onClick={() => FireOpener("https://" + deployment.url)}
                />
                <Cell
                    children="Статус"
                    indicator={<Counter type={state.color} children={state.text}/>}
                />
                <Cell
                    children="Создано"
                    indicator={createdAt.toLocaleString()}
                />
                <Cell
                    children="Регионы"
                    indicator={deployment.regions.join(", ")}
                />
            </Group>
            <Group title="Дополнительный имена">
                {deployment.alias.map((a, key) => {
                    return (
                        <Cell
                            expandable
                            key={key}
                            children={a}
                            onClick={() => FireOpener("https://" + a)}
                        />
                    );
                })}
            </Group>
        </Panel>
    );
};

const mapState = (state) => ({
    deployment: state.deployments.activeDeployment
});

const mapDispatch = (dispatch) => ({
    goBack: dispatch.navigator.goBack
});

export default connect(mapState, mapDispatch)(Deployment);