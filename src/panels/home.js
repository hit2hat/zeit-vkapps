import React from "react";
import { Panel, PanelHeader } from "@vkontakte/vkui";

const Home = ({ id }) => {
    return (
        <Panel id={id}>
            <PanelHeader>Zeit [Beta]</PanelHeader>
        </Panel>
    );
};

export default Home;