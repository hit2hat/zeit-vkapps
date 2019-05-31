import React from "react";
import { connect } from "react-redux";
import { Panel, PanelHeader, Div, Group, List, Cell, Avatar } from "@vkontakte/vkui";
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

import Icon24Bug from '@vkontakte/icons/dist/24/bug';
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';

import FireOpener from "../fire-opener";

const About = ({ id, back }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={back} />}
            >
                О сервисе
            </PanelHeader>
            <Group style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "25px 100px",
                textAlign: "center"
            }}>
                <Div>
                    <img src={require("../assets/zeit_logo.png")} alt="" style={{
                        width: "50%",
                        boxShadow: "0 0 25px rgba(0, 0, 0, .5)",
                        borderRadius: 35,
                        background: "black"
                    }}/>
                    <h3 style={{ margin: 0, padding: 0, paddingTop: 25 }}>Zeit for VK</h3>
                    <h4 style={{ margin: 0, padding: 0, paddingTop: 5, color: 'rgba(0, 0, 0, .5)'}}>
                        Версия: {process.env.REACT_APP_VERSION ? process.env.REACT_APP_VERSION.slice(0, 7) : "untagged"}
                    </h4>
                </Div>
            </Group>
            <Group>
                <Div>
                    Наша миссия - сделать облачные вычисления доступными для всех.
                </Div>
            </Group>
            <Group title="Разработчики">
                <List>
                    <Cell
                        onClick={() => FireOpener("https://vk.com/id182625786")}
                        description="@hit2hat"
                        before={<Avatar src="https://sun1-23.userapi.com/c850632/v850632751/1099c4/qw3BsBsm7OU.jpg?ava=1" />}
                    >
                        Степан Новожилов
                    </Cell>
                </List>
            </Group>
            <Group title="Полезные ссылки">
                <List>
                    <Cell
                        expandable
                        onClick={() => FireOpener("https://vk.com/zeithq")}
                        before={<Icon24Globe/>}
                    >
                        Официальная группа
                    </Cell>
                    <Cell
                        expandable
                        onClick={() => FireOpener("https://vk.me/zeithq")}
                        before={<Icon24Help/>}
                    >
                        Предложить идею
                    </Cell>
                    <Cell
                        expandable
                        onClick={() => FireOpener("https://vk.me/zeithq")}
                        before={<Icon24Bug fill="#4bb34b" />}
                    >
                        <span style={{ color: "#4bb34b" }}>Сообщить о баге</span>
                    </Cell>
                </List>
            </Group>
        </Panel>
    );
};

const mapProps = () => ({});
const mapDispatch = (dispatch) => ({
    back: dispatch.navigator.goBack
});

export default connect(mapProps, mapDispatch)(About);
