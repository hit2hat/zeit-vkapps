import * as API from "../api";
import store from "./index";

const user = {
    state: {},
    reducers: {
        loaded(state, payload) {
            return payload
        }
    },
    effects: (dispatch) => ({
        async load() {
            API.getProfile().then(async (profile) => {
                console.log(profile);
                dispatch.user.loaded(profile);
                store.dispatch.projects.load();
                return store.dispatch.navigator.goForce("home");
            })
                .catch(() => dispatch.navigator.goForce("auth"));
        }
    })
};

export default user;