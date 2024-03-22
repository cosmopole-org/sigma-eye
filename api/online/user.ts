import axios from "axios";

export const getUser = async (
  userSub: string,
  token: string
) => {
  try {
    const { data } = await axios(/*baseUrl + */"/crud/User?sub=" + userSub, {
      headers: {
        Authorization: "Bearer " + token || "",
        authtype: "JWT"
      },
    });
    return data;
  } catch (err: any) {
    console.error(err);
    return {
      error: err.message,
      status: err.response ? err.response.status : 500,
    };
  }
};

export const subPortalPayment = async (
  baseUrl: string,
  token: string
) => {
  try {
    const { data } = await axios(baseUrl + "/sub-portal-payment", {
      headers: {
        Authorization: "Bearer " + token || "",
        authtype: "JWT"
      },
    });
    return data;
  } catch (err: any) {
    console.error(err);
    return {
      error: err.message,
      status: err.response ? err.response.status : 500,
    };
  }
};

export const subPortalCancel = async (
  baseUrl: string,
  token: string
) => {
  try {
    const { data } = await axios(baseUrl + "/sub-portal-cancel", {
      headers: {
        Authorization: "Bearer " + token || "",
        authtype: "JWT"
      },
    });
    return data;
  } catch (err: any) {
    console.error(err);
    return {
      error: err.message,
      status: err.response ? err.response.status : 500,
    };
  }
};


export const subPortalUpdate = async (
  baseUrl: string,
  token: string
) => {
  try {
    const { data } = await axios(baseUrl + "/sub-portal-update", {
      headers: {
        Authorization: "Bearer " + token || "",
        authtype: "JWT"
      },
    });
    return data;
  } catch (err: any) {
    console.error(err);
    return {
      error: err.message,
      status: err.response ? err.response.status : 500,
    };
  }
};

