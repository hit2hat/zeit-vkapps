import React from "react";
import { connect } from "react-redux";
import FireOpener from "../fire-opener";
import { Panel, PanelHeader, Group, Cell } from "@vkontakte/vkui";
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Counter from "@vkontakte/vkui/dist/components/Counter/Counter";

const Domain = ({ id, domain, goBack }) => {
    const createdAt = new Date();
    createdAt.setTime(domain.createdAt);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>{domain.name}</PanelHeader>
            <Group title="Основная информация">
                <Cell
                    expandable
                    children="Домен"
                    indicator={domain.name}
                    onClick={() => FireOpener("https://" + domain.name)}
                />
                <Cell
                    children="Тип"
                    asideContent={domain.serviceType === "external" ? "Внешний" : "Внутренний"}
                />
                <Cell
                    children="Статус"
                    indicator={
                        <Counter
                            type={domain.verified ? "primary" : "prominent"}
                            children={domain.verified ? "Подтвержден" : "Не подтвержден"}
                        />
                    }
                />
                <Cell
                    children="CDN"
                    indicator={
                        <Counter
                            type={domain.cdnEnabled ? "primary" : "secondary"}
                            children={domain.cdnEnabled ? "Вкл" : "Выкл"}
                        />
                    }
                />
                <Cell
                    children="Добавлен"
                    asideContent={createdAt.toLocaleString()}
                />
            </Group>
        </Panel>
    );
};

const mapState = (state) => ({
    domain: state.domains.activeDomain
});

const mapDispatch = (dispatch) => ({
    goBack: dispatch.navigator.goBack
});

export default connect(mapState, mapDispatch)(Domain);