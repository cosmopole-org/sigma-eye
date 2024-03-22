import axios from "axios";

export const createMemory = async (
  baseUrl: string,
  file: any,
  name: string,
  token: string
) => {
  try {
    if (token != "") {
      const form = new FormData();
      if (file) form.append("file", file, file?.name);
      const { data } = await axios({
        method: "post",
        url: baseUrl + "/memory?name=" + name,
        data: form,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return [data, null];
    }
    return [null, "No auth token was provided"];
  } catch (err: any) {
    if(err?.response?.data.detail){
      return [null, err?.response?.data.detail];
    }
    else{
      return [null, err.toString()];
    }
  }
};

export const deleteMemory = async (
  baseUrl: string,
  token: string,
  id: string
) => {
  try {
    if (token != "") {
      const { data } = await axios({
        method: "delete",
        url: baseUrl + "/memory/" + id,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return data;
    }
  } catch (err: any) {
    return err.toString();
  }
};

export const getEmbedConfig = async (baseUrl: string, name: string, token: string) => {
  try {
    if (token != "") {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "/config_embed/" + name,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return data;
    }
  } catch (err: any) {
    return err.toString();
  }
};

export const getApp = async (baseUrl: string, id: string, token: string) => {
  try {
    if (token != "") {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "/train/" + id,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return data.result[0];
    }
  } catch (err: any) {
    return err.toString();
  }
};

export const getSessions = async (baseUrl: string, id: string, token: string) => {
  try {
    if (token != "") {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "/sessions/" + id,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return data;
    }
  } catch (err: any) {
    return err.toString();
  }
};

export const getBrainMemories = async (baseUrl: string, id: string, token: string) => {
  try {
    if (token != "") {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "/brains/" + id,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return data;
    }
  } catch (err: any) {
    return err.toString();
  }
};

export const getSessionChat = async (baseUrl: string, pid:string, sid: string, token: string) => {
  try {
    if (token != "") {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "/sessions/" + pid + "/" + sid,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return data;
    }
  } catch (err: any) {
    return err.toString();
  }
};

export const deleteApp = async (
  baseUrl: string,
  name: string,
  token: string
) => {
  try {
    if (token != "") {
      const { data } = await axios({
        method: "delete",
        url: baseUrl + "/train/" + name,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return data;
    }
  } catch (err: any) {
    return err.toString();
  }
};

export const createApp = async (
  baseUrl: string,
  files: string[],
  name: string,
  token: string
) => {
  try {
    if (token != "") {
      const { data } = await axios({
        method: "post",
        url: baseUrl + "/train",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: JSON.stringify({
          name,
          memory: files,
          user_id: "1",
          meta: {},
        }),
      });
      return [data, null];
    }
    return [null, "Unauthenticated request"];
  } catch (err: any) {
    if (err?.response?.data.detail) {
      return [null, err?.response?.data.detail];
    } else {
      return [null, err.toString()];
    }
  }
};

export const configEmbed = async (
  baseUrl: string,
  embed_id: string,
  config: object,
  token: string
) => {
  try {
    if (token !== "") {
      const { data } = await axios({
        method: "post",
        url: baseUrl + "/config_embed",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: JSON.stringify({
          embed_id,
          config: JSON.stringify(config),
        }),
      });
      return data;
    }
  } catch (err: any) {
    return err.toString();
  }
};


export const getMemories = async (baseUrl: string, token: string) => {
  try {
    if (token != "") {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "/memory",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return data;
    }
  } catch (err: any) {
    return err.toString();
  }
};
