import { getProfile, getTokens } from "../api";
import store from "./index";

const user = {
    state: {},
    reducers: {
        loaded(state, payload) {
            return payload
        },
        updateTokens(state, payload) {
            return { ...state, tokens: payload };
        }
    },
    effects: (dispatch) => ({
        async load() {
            getProfile().then(async (profile) => {
                dispatch.user.loaded(profile);
                store.dispatch.projects.load();
                store.dispatch.domains.load();
                getTokens().then((tokens) => dispatch.user.updateTokens(tokens));
                return store.dispatch.navigator.goForce("home");
            })
                .catch(() => dispatch.navigator.goForce("auth"));
        }
    })
};

export default user;