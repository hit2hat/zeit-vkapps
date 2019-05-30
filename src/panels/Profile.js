import React from "react";
import { zeit_token } from "../api";
import { connect } from "react-redux";
import { Panel, PanelHeader, List, Cell, Avatar, Div, Group, Spinner } from "@vkontakte/vkui";
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';

const Profile = ({ id, user, goBack }) => (
    <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>@{user.username}</PanelHeader>
        <Div style={{ background: "white", display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Avatar
                size={140}
                src={"https://zeit.co/api/www/avatar/" + user.avatar}
            />
            <h3>{user.name}</h3>
        </Div>
        <List>
            <Cell
                children="Тарифный план"
                indicator={user.billing.plan === "free" ? <Counter type="primary">Free</Counter> : <Counter type="prominent">Unlimited</Counter>}
            />
            <Cell
                children="Email"
                asideContent={user.email}
            />
        </List>
        <Group title="Активные сессии">
            {
                user.tokens ?
                    user.tokens.tokens.map((token, key) => {
                        if (token.id === user.tokens.testingTokenId) return null;
                        return (
                            <Cell
                                key={key}
                                children={token.name}
                                indicator={token.token === zeit_token ? <Counter type="primary" children="Это приложение" /> : null}
                            />
                        );
                    })
                : <div style={{ paddingBottom: 15 }}><Spinner/></div>
            }
        </Group>
    </Panel>
);

const mapState = (state) => ({
    user: state.user
});

const mapDispatch = (dispatch) => ({
    goBack: dispatch.navigator.goBack
});

export default connect(mapState, mapDispatch)(Profile);