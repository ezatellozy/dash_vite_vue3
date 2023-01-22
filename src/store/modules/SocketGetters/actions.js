import axios from "axios";

export default {
  get_contracts(context) {
    let contracts = [];
    context.commit("set_loading", true);
    axios
      .get(`/contract`, {
        headers: {
          Authorization: "bearer" + localStorage.getItem("Inflico_token"),
          "cache-control": "no-cache",
          "Content-type": "application/json",
          Accept: "application/json",
          "Accept-Language": context.rootGetters["lang_module/lang"],
        },
      })
      .then((res) => {
        context.commit("set_loading", false);
        contracts = res.data.data;
        context.commit("set_contracts", contracts);
      });
  },

  get_transfares(context) {
    let transfares = [];
    context.commit("set_loading", true);
    axios
      .get("/transfer_request", {
        headers: {
          Authorization: "bearer" + localStorage.getItem("Inflico_token"),
          "Accept-Language": context.rootGetters["lang_module/lang"],
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        context.commit("set_loading", false);
        transfares = res.data.data;
        context.commit("set_transfares", transfares);
      });
  },

  get_messages(context) {
    let messages = [];
    context.commit("set_loading", true);
    axios
      .get("/contact_management", {
        headers: {
          Authorization: "bearer" + localStorage.getItem("Inflico_token"),
          "Accept-Language": context.rootGetters["lang_module/lang"],
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        messages = res.data.data.map((message) => {
          context.commit("set_loading", false);
          return {
            id: message.id,
            fullname: message.fullname,
            email: message.email,
            message: message.message.substring(0, 40) + "...",
          };
        });

        context.commit("set_messages", messages);
      });
  },

  get_requests(context) {
    let requests = [];
    context.commit("set_loading", true);
    axios
      .get("/deactivated_requests", {
        headers: {
          Authorization: "bearer" + localStorage.getItem("Inflico_token"),
          "Accept-Language": context.rootGetters["lang_module/lang"],
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        context.commit("set_loading", false);
        requests = res.data.data;
        context.commit("set_requests", requests);
      });
  },

  get_influencers(context) {
    let influencers = [];
    context.commit("set_loading", true);
    axios
      .get("/influencers", {
        headers: {
          Authorization: "bearer" + localStorage.getItem("Inflico_token"),
          "Accept-Language": context.rootGetters["lang_module/lang"],
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        influencers = res.data.data;
        context.commit("set_loading", false);
        context.commit("set_influencers", influencers);
      });
  },

  get_investors(context) {
    let investors = [];
    context.commit("set_loading", true);
    axios
      .get("/investors", {
        headers: {
          Authorization: "bearer" + localStorage.getItem("Inflico_token"),
          "Accept-Language": context.rootGetters["lang_module/lang"],
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        context.commit("set_loading", false);
        investors = res.data.data;
        context.commit("set_investors", investors);
      });
  },

  get_platformRequests(context) {
    let platformRequests = [];
    context.commit("set_loading", true);
    axios
      .get("/edit_social_request", {
        headers: {
          Authorization: "bearer" + localStorage.getItem("Inflico_token"),
          "Accept-Language": context.rootGetters["lang_module/lang"],
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        context.commit("set_loading", false);
        platformRequests = res.data.data;
        context.commit("set_platformRequests", platformRequests);
      });
  },

  get_notification(context) {
    let notification = [];
    axios
      .get("/notifications", {
        headers: {
          Authorization: "bearer" + localStorage.getItem("Inflico_token"),
          "Accept-Language": context.rootGetters["lang_module/lang"],
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        notification = res.data.data;
        context.commit("set_notification", notification);
      });
  },
};
