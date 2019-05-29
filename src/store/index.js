import { init } from "@rematch/core";

import navigator from "./navigator";
import user from "./user";
import projects from "./projects";

const models = {
    navigator,
    projects,
    user
};

const store = init({
    models
});

export default store;