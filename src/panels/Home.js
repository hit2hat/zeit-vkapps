import React from "react";
import { connect } from "react-redux";
import { Panel, PanelHeader, Group, Cell, Avatar, Spinner, HeaderButton } from "@vkontakte/vkui";
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';

import Icon24Info from '@vkontakte/icons/dist/24/info';

const Home = ({ id, user, projects, projectsLoaded, domains, domainsLoaded, goForward, selectProject, selectDomain }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                left={
                    <HeaderButton onClick={() => goForward("about")}>
                        <Icon24Info/>
                    </HeaderButton>
                }
            >
                Zeit for VK [Beta]
            </PanelHeader>
            <Group title="Мой профиль">
                <Cell
                    expandable
                    children={user.name}
                    description={user.email}
                    before={<Avatar src={"https://zeit.co/api/www/avatar/" + user.avatar}/>}
                    onClick={() => goForward("profile")}
                    indicator={user.billing.plan === "free" ? <Counter type="secondary">Free</Counter> : <Counter type="primary">Unlimited</Counter>}
                />
            </Group>
            <Group title="Домены">
                {
                    domainsLoaded ?
                        domains.map((domain, key) => {
                            return (
                                <Cell
                                    expandable
                                    key={key}
                                    children={domain.name}
                                    indicator={
                                        <Counter
                                            type={domain.verified ? "primary" : "prominent"}
                                            children={domain.verified ? "Подтвержден" : "Не подтвержден"}
                                        />
                                    }
                                    onClick={() => selectDomain(key)}
                                />
                            );
                        })
                        : <div style={{ paddingBottom: 15 }}><Spinner/></div>
                }
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
    projects: state.projects.list,
    domainsLoaded: state.domains.isLoaded,
    domains: state.domains.list
});

const mapDispatch = (dispatch) => ({
    goForward: dispatch.navigator.goForward,
    selectProject: dispatch.projects.selectProject,
    selectDomain: dispatch.domains.selectDomain
});

export default connect(mapState, mapDispatch)(Home);