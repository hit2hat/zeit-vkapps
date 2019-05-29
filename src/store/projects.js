import * as API from "../api";

const projects = {
    state: {
        isLoaded: false,
        list: [],
        activeProject: null
    },
    reducers: {
        loaded(state, payload) {
            return { isLoaded: true, list: payload, activeProject: null};
        },
        select(state, payload) {
            return { ...state, activeProject: payload };
        }
    },
    effects: (dispatch) => ({
        async load() {
            API.getProjectsList().then((projects) => dispatch.projects.loaded(projects));
        },
        selectProject(id, state) {
            dispatch.projects.select(state.projects.list[id]);
            dispatch.navigator.goForward("project");
        }
    })
};

export default projects;