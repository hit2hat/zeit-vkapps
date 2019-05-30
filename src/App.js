import React from "react";
import { connect } from "react-redux";
import { ConfigProvider, View, Panel, Spinner } from "@vkontakte/vkui";

import AuthPanel from "./panels/Auth";
import HomePanel from "./panels/Home";
import ProfilePanel from "./panels/Profile";
import ProjectPanel from "./panels/Project";
import DeploymentPanel from "./panels/Deployment";
import DomainPanel from "./panels/Domain";

const App = ({ activePanel, popout, history, goBack }) => {
	return (
		<ConfigProvider isWebView={true}>
			<View
				history={history}
				onSwipeBack={goBack}
				activePanel={activePanel}
				popout={popout}
			>
				<Panel id="init" theme="white" children={<Spinner/>}/>
				<AuthPanel id="auth"/>
				<HomePanel id="home"/>
				<ProfilePanel id="profile"/>
				<ProjectPanel id="project"/>
				<DeploymentPanel id="deployment"/>
				<DomainPanel id="domain"/>
			</View>
		</ConfigProvider>
	);
};

const mapState = (state) => ({
	history: state.navigator.history,
	activePanel: state.navigator.active,
	popout: state.navigator.popout
});

const mapDispatch = (dispatch) => ({
	goBack: dispatch.navigator.goBack
});

export default connect(mapState, mapDispatch)(App);
