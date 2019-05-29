const endpoint = "https://api.zeit.co/";

let zeit_token = "";

export const setToken = (token) => zeit_token = token;

/*
    User section
 */
export const getProfile = () => __requestBuilder("www/user", "user");

/*
    Projects section
 */
export const getProjectsList = () => __requestBuilder("v1/projects/list");

/*
    Deployments section
 */
export const getDeploymentsByProject = (projectId) => __requestBuilder("v4/now/deployments", "deployments", { projectId });

// helpers
const __requestBuilder = (method, responseField = null, params = {}) => new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + zeit_token);

    const fields = [];
    Object.keys(params).forEach((key) => fields.push(key + "=" + params[key]));

    fetch(endpoint + method + "?" + fields.join("&"), {
        headers
    })
        .then((response) => response.json())
        .then((response) => resolve(responseField ? response[responseField]: response))
        .catch(() => reject())
});