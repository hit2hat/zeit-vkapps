import { getDomains } from "../api";

const domains = {
    state: {
        isLoaded: false,
        list: [],
        activeDomain: null
    },
    reducers: {
        setLoading(state) {
            return { ...state, isLoaded: false };
        },
        loaded(state, payload) {
            return { isLoaded: true, list: payload, activeDomain: null };
        },
        select(state, payload) {
            return { ...state, activeDomain: payload };
        }
    },
    effects: (dispatch) => ({
        async load() {
            dispatch.domains.setLoading();
            getDomains()
                .then((domains) => dispatch.domains.loaded(domains))
                .catch(console.error);
        },
        selectDomain(id, state) {
            dispatch.domains.select(state.domains.list[id]);
            dispatch.navigator.goForward("domain");
        }
    })
};

export default domains;