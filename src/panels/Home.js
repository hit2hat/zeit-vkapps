import React from "react";
import { connect } from "react-redux";
import { Panel, PanelHeader, Group, Cell, Avatar, Spinner } from "@vkontakte/vkui";
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';

const Home = ({ id, user, projects, projectsLoaded, goForward, selectProject }) => {
    return (
        <Panel id={id}>
            <PanelHeader>Zeit for VK [Beta]</PanelHeader>
            <Group title="Мой профиль">
                <Cell
                    expandable
                    children={user.name}
                    description={user.email}
                    before={<Avatar src={"https://zeit.co/api/www/avatar/" + user.avatar}/>}
                    onClick={() => goForward("profile")}
                    indicator={user.billing.plan === "free" ? <Counter type="primary">Free</Counter> : <Counter type="prominent">Unlimited</Counter>}
                />
            </Group>
            <Group title="Проекты">
                {
                    projectsLoaded ?
                        projects.map((project, key) => {
                            const updatedAt = new Date();
                            updatedAt.setTime(project.updatedAt);

                            return (
                                <Cell
                                    expandable
                                    key={project.id}
                                    children={project.name}
                                    description={"Последнее обновление: " + updatedAt.toLocaleString("ru-RU")}
                                    onClick={() => selectProject(key)}
                                />
                            );
                        })
                        : <div style={{ paddingBottom: 15 }}><Spinner/></div>
                }
            </Group>
        </Panel>
    );
};

const mapState = (state) => ({
    user: state.user,
    projectsLoaded: state.projects.isLoaded,
    projects: state.projects.list
});

const mapDispatch = (dispatch) => ({
    goForward: dispatch.navigator.goForward,
    selectProject: dispatch.projects.selectProject
});

export default connect(mapState, mapDispatch)(Home);