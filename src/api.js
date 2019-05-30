const endpoint = "https://api.zeit.co/";

let zeit_token = "";

export const setToken = (token) => zeit_token = token;

/*
    User section
 */
export const getProfile = () => __requestBuilder("GET","www/user", "user");

/*
    Projects section
 */
export const getProjectsList = () => __requestBuilder("GET","v1/projects/list");

/*
    Deployments section
 */
export const resolveDeploymentState = (state) => {
    switch (state) {
        case "INITIALIZING":
            return { text: "Запускается", color: "secondary" };
        case "ANALYZING":
            return { text: "Анализируется", color: "secondary" };
        case "BUILDING":
            return { text: "Собирается", color: "secondary" };
        case "DEPLOYING":
            return { text: "Развертывается", color: "secondary" };
        case "READY":
            return { text: "Развернуто", color: "primary" };
        case "ERROR":
            return { text: "Ошибка", color: "prominent" };
        default:
            return { text: "", color: "secondary" };
    }
};
export const getDeploymentsByProject = (projectId) => __requestBuilder("GET","v4/now/deployments", "deployments", { projectId });
export const getDeploymentById = (deploymentId) => __requestBuilder("GET", "v9/now/deployments/" + deploymentId);

// helpers
const __requestBuilder = (type, method, responseField = null, params = {}) => new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + zeit_token);

    const fields = [];
    Object.keys(params).forEach((key) => fields.push(key + "=" + params[key]));

    fetch(endpoint + method + "?" + fields.join("&"), {
        headers,
        method: type
    })
        .then((response) => response.json())
        .then((response) => resolve(responseField ? response[responseField]: response))
        .catch(() => reject())
});