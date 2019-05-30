import { init } from "@rematch/core";

import navigator from "./navigator";
import user from "./user";
import projects from "./projects";
import deployments from "./deployments";

const models = {
    navigator,
    user,
    projects,
    deployments
};

const store = init({
    models
});

export default store;