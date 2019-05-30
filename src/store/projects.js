import { getProjectsList } from "../api";

const projects = {
    state: {
        isLoaded: false,
        list: [],
        activeProject: null
    },
    reducers: {
        loading(state) {
            return { ...state, isLoaded: false };
        },
        loaded(state, payload) {
            return { isLoaded: true, list: payload, activeProject: null};
        },
        select(state, payload) {
            return { ...state, activeProject: payload };
        }
    },
    effects: (dispatch) => ({
        async load() {
            dispatch.projects.loading();
            getProjectsList().then((projects) => dispatch.projects.loaded(projects));
        },
        selectProject(id, state) {
            dispatch.projects.select(state.projects.list[id]);
            dispatch.deployments.load(state.projects.list[id].id);
            dispatch.navigator.goForward("project");
        }
    })
};

export default projects;