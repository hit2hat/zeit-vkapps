import React from "react";
import { connect } from "react-redux";
import { Panel, PanelHeader } from "@vkontakte/vkui";
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

const Project = ({ id, project, goBack }) => (
    <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>{project.name}</PanelHeader>
    </Panel>
);

const mapState = (state) => ({
    project: state.projects.activeProject
});

const mapDispatch = (dispatch) => ({
    goBack: dispatch.navigator.goBack
});

export default connect(mapState, mapDispatch)(Project);