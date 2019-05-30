import React, { useState } from "react";
import { connect } from "react-redux";
import VKStorage from "vk-storage";
import { setToken } from "../api";
import { Panel, PanelHeader, FormLayout, FormStatus, Input, Button } from "@vkontakte/vkui";

const Auth = ({ id, loadProfile }) => {
    const [zeitToken, setZeitToken] = useState("");

    const auth = () => VKStorage.set("zeit_token", zeitToken).then(() => {
        setToken(zeitToken);
        loadProfile();
    });

    return (
        <Panel id={id} theme="white">
            <PanelHeader>Авторизация</PanelHeader>
            <FormLayout>
                <FormStatus title="Как это работает?" state="default">
                    Для работы приложения вам необходимо сгенерировать токен
                    на <a href="https://zeit.co" target="_blank" rel="noopener noreferrer">https://zeit.co</a>
                </FormStatus>
                <img src={require("../assets/auth-helper.png")} style={{ width: "100%" }} alt="" />
                <Input
                    top="Токен Zeit"
                    placeholder="******"
                    value={zeitToken}
                    onChange={(e) => setZeitToken(e.currentTarget.value)}
                />
                <Button onClick={auth}>Авторизироваться</Button>
            </FormLayout>
        </Panel>
    );
};

const mapState = () => {};
const mapDispatch = (dispatch) => ({
    loadProfile: dispatch.user.load
});

export default connect(mapState, mapDispatch)(Auth);