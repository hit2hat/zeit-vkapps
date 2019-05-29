import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import connect from "@vkontakte/vkui-connect-promise";
import VKStorage from "vk-storage";
import "@vkontakte/vkui/dist/vkui.css";

import * as API from "./api";
import App from "./App";
import store from "./store";

// Init VK App
connect.send("VKWebAppInit", {});
connect.send("VKWebAppGetAuthToken", {
    app_id: 7002197,
    scope: "friends"
})
    .then((response) => {
        VKStorage.init({ access_token: response.data.access_token, connect })
            .then(() => {
                const zeit_token = VKStorage.get("zeit_token");
                if (zeit_token) {
                    API.setToken(zeit_token);
                    return store.dispatch.user.load();
                } else {
                    return store.dispatch.navigator.goForce("auth");
                }
            })
            .catch(console.error);
    })
    .catch(console.error);


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
