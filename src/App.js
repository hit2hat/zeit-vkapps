import React from "react";
import { connect } from "react-redux";
import { View, Panel, Spinner } from "@vkontakte/vkui";

import HomePanel from "./panels/home";

const App = ({ activePanel, popout }) => {
	return (
		<View activePanel={activePanel} popout={popout}>
			<Panel id="init" children={<Spinner/>}/>
			<HomePanel id="home" />
		</View>
	);
};

const mapState = (state) => ({
	activePanel: state.navigator.active,
	popout: state.navigator.popout
});

export default connect(mapState)(App);
