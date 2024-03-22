import axios from "axios";

export const updateProjectConfigs = async (
  baseUrl: string,
  _id: any,
  config: any,
  token: string
) => {
  try {
    const { data } = await axios.put(
      baseUrl + "/crud/Bot?_id=" + _id,
      {
        config: config,
      },
      {
        headers: {
          authtype: "JWT",
          authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (err: any) {
    return err.toString();
  }
};

// Similar error handling for all other functions

export const getProjects = async (
  baseUrl: string,
  userId: string,
  token: string
) => {
  try {
    const { data } = await axios(baseUrl + "/crud/Bot?user_id=" + userId, {
      headers: {
        Authorization: "Bearer " + token || "",
        authtype: "JWT",
      },
    });
    return [data, null];
  } catch (err: any) {
    return [null, err.toString()];
  }
};

export const getPlan = async (baseUrl: string, token: string) => {
  try {
    const { data } = await axios.get(baseUrl + "/plan", {
      headers: {
        Authorization: "Bearer " + token || "",
        authType: "JWT",
      },
    });
    return data;
  } catch (err: any) {
    return err.toString();
  }
};

export const getProjectById = async (
  userId: string,
  token: string,
  projectId: string
) => {
  try {
    const { data } = await axios(
      /*baseUrl + */"/crud/Bot?_id=" + projectId + "&user_id=" + userId,
      {
        headers: {
          Authorization: "Bearer " + token || "",
          authtype: "JWT",
        },
      }
    );
    return data[0];
  } catch (err: any) {
    return err.toString();
  }
};

export const deleteProject = async (
  baseUrl: string,
  token: string,
  bot_id: string
) => {
  console.log(bot_id);
  await axios.delete(
    baseUrl + "/crud/Step?bot_id=" + bot_id,

    {
      headers: {
        Authorization: "Bearer " + token,
        authType: "JWT",
      },
    }
  );
  await axios.delete(
    baseUrl + "/crud/Bot?_id=" + bot_id,

    {
      headers: {
        Authorization: "Bearer " + token,
        authType: "JWT",
      },
    }
  );
};

export const createProject = async (
  baseUrl: string,
  name: string,
  desc: string,
  tags: string,
  token: string
) => {
  try {
    const { data } = await axios.post(
      baseUrl + "/crud/Bot",
      { name, desc, tags },
      {
        headers: {
          Authorization: "Bearer " + token,
          authType: "JWT",
        },
      }
    );
    return data;
  } catch (err: any) {
    return err.toString();
  }
};
export const processPipeline = async (
  baseUrl: string,
  token: string,
  bot_id: string,
  embed_id: string,
  instruction: string = "",
  existing_ki_element_id: string = "",
  existing_ki_step_id: string = ""
) => {
  try {
    let ki_step_id = existOrCreateId("step", existing_ki_step_id);
    let ki_element_id = existOrCreateId("element", existing_ki_element_id);
    const { data } = await axios.post(
      baseUrl + "/pipeline",
      {
        steps: [
          {
            _id: ki_step_id,
            type: "KI",
            elements: [
              {
                instruction,
                id: ki_element_id,
                type: "openAI",
                embed: embed_id,
                version: "2",
              },
            ],
            position: {
              x: 400,
              y: 250,
            },
          },
        ],
        bot_id,
      },
      {
        headers: {
          authtype: "JWT",
          authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (err: any) {
    return err.toString();
  }
};

export const processSingleStepPipeline = async (
  baseUrl: string,
  token: string,
  bot_id: string,
  embed_id: string,
  instruction: string = "",
  existing_ki_element_id: string = "",
  existing_ki_step_id: string = ""
) => {
  try {
    let ki_step_id = existOrCreateId("step", existing_ki_step_id);
    let ki_element_id = existOrCreateId("element", existing_ki_element_id);
    const { data } = await axios.post(
      baseUrl + "/pipeline",
      {
        steps: [
          {
            _id: ki_step_id,
            type: "KI",
            elements: [
              {
                instruction,
                id: ki_element_id,
                type: "openAI",
                embed: embed_id,
                version: "2",
              },
            ],
            position: {
              x: 400,
              y: 250,
            },
          },
        ],
        bot_id,
      },
      {
        headers: {
          authtype: "JWT",
          authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (err: any) {
    return err.toString();
  }
};

export const updateSingleStepPipeline = async (
  baseUrl: string,
  token: string,
  bot_id: string,
  existing_ki_element_id: string = "",
  existing_ki_step_id: string = "",
  steps: any[] = [],
  textList: any[] = []
) => {
  try {
    let ki_step_id = existOrCreateId("step", existing_ki_step_id);
    let ki_element_id = existOrCreateId("element", existing_ki_element_id);
    const { data } = await axios.post(
      baseUrl + "/pipeline",
      {
        steps: [
          {
            _id: ki_step_id + "-0",
            type: "static",
            elements: [
              ...textList.map((textItem, index) => ({
                data: textItem,
                id: ki_element_id + "-" + index,
                type: "text",
              })),
              {
                next: [
                  {
                    next: ki_step_id,
                    type: "default",
                    nid: "1687356214346-element-1687356210954",
                  },
                ],
                id: "element-1687356210954",
                type: "next",
                delay: "500",
              },
            ],
            position: {
              x: 200,
              y: 250,
            },
          },
          ...steps.filter(step => step._id != ki_step_id + "-0"),
        ],
        bot_id,
      },
      {
        headers: {
          authtype: "JWT",
          authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (err: any) {
    return err.toString();
  }
};

export const getSteps = async (
  botId: string
): Promise<any[]> => {
  const { data } = await axios.get(/*baseUrl + */"/crud/Step?bot_id=" + botId);
  return data as any[];
};

const existOrCreateId = (namespace: string, checking_text: string): string => {
  try {
    let final_text = "";

    if (checking_text != "") {
      final_text = checking_text;
    } else {
      // Get current timestamp
      var timestamp = Date.now();

      // Generate a random number between 0 and 1000000
      var randomNumber = Math.floor(Math.random() * 1000000);

      // Create the string
      final_text = `${namespace}-${timestamp}-${randomNumber}`;
    }
    return final_text;
  } catch (err: any) {
    return err.toString();
  }
};
