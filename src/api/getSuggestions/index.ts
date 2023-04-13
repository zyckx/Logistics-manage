import axios from "axios";

export const getSuggestions = (query: string) => {
  return axios.get("/baidu", {
    params: {
      pre: 1,
      prod: "pc",
      from: "pc_web",
      wd: query,
      json: 1,
      ie: "utf-8",
      p: 3,
      csor: 2,
      pwd: 2,
      req: 2,
    },
  });
};
