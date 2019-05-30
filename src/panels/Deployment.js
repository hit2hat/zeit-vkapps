import React, { useState } from "react";
import { connect } from "react-redux";
import { resolveDeploymentState } from "../api";
import FireOpener from "../fire-opener";
import { Panel, PanelHeader, Group, Cell, Avatar } from "@vkontakte/vkui";
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

const Deployment = ({ id, deployment, goBack }) => {
    const state = resolveDeploymentState(deployment.readyState);
    const createdAt = new Date();
    const [ ghAvatar, setGhAvatar ] = useState(null);

    if (deployment.meta.githubDeployment === "1") {
        fetch("https://api.github.com/users/" + deployment.meta.githubCommitAuthorLogin)
            .then((result) => result.json())
            .then((result) => setGhAvatar(result.avatar_url))
            .catch(console.error);
    }

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
                    children="Тип"
                    indicator={deployment.target}
                />
                <Cell
                    children="Статус"
                    indicator={<Counter type={state.color} children={state.text}/>}
                />
                <Cell
                    children="Видимость"
                    indicator={deployment.public ? "Все" : "Только я"}
                />
                <Cell
                    children="Создано"
                    indicator={createdAt.toLocaleString()}
                />
                <Cell
                    children="Регионы размещения"
                    indicator={deployment.regions.join(", ")}
                />
            </Group>
            {deployment.meta.githubDeployment === "1" ?
                <Group title="GitHub">
                    <Cell
                        expandable
                        before={<Avatar src={ghAvatar} />}
                        children={deployment.meta.githubCommitMessage}
                        indicator={<Counter type="secondary" children={deployment.meta.githubCommitSha.slice(0, 7)}/>}
                        description={"github.com/" + deployment.meta.githubCommitAuthorLogin}
                        onClick={() => FireOpener("https://github.com/" + deployment.meta.githubCommitOrg + "/" + deployment.meta.githubCommitRepo + "/commit/" + deployment.meta.githubCommitSha)}
                    />
                </Group>
                : null
            }
            <Group title="Дополнительный имена (Aliases)">
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