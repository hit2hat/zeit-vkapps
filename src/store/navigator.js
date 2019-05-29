import connect from "@vkontakte/vkui-connect-promise";

const homePanel = "init";

const navigator = {
    state: {
        active: homePanel,
        history: [homePanel],
        popout: null
    },
    reducers: {
        go(state, payload) {
            return {active: payload, history: [...state.history, payload], popout: null};
        },
        back(state) {
            return {active: state.history[state.history.length - 2], history: state.history.slice(0, state.history.length - 1), popout: null};
        },
        replace(state, payload) {
            return {...state, active: payload, history: [payload], popout: null};
        },
        setPopout(state, payload) {
            return {...state, popout: payload};
        }
    },
    effects: (dispatch) => ({
        goForward(panel, state) {
            if(state.navigator.active === homePanel) {
                connect.send("VKWebAppEnableSwipeBack", {});
            }
            dispatch.navigator.go(panel);
        },
        goBack(payload, state) {
            if(state.navigator.history[state.navigator.history.length - 2] === homePanel) {
                connect.send("VKWebAppDisableSwipeBack", {});
            }
            dispatch.navigator.back();
        },
        goForce(panel) {
            connect.send("VKWebAppDisableSwipeBack", {});
            dispatch.navigator.replace(panel);
        }
    })
};

export default navigator;