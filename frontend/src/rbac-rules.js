const rules = {
  visitor: {
    static: ["actors:get"]
  },
  casting_assistant: {
    static: [
      "actors:get",
      "movies:get"
    ],
  },
  casting_director: {
    static: [
      "actors:get",
      "movies:get",
      "actors:post",
      "actors:delete",
      "actors:patch",
      "movies:patch"
    ]
  },
  executive_director: {
    static: [
      "actors:get",
      "movies:get",
      "actors:post",
      "actors:delete",
      "actors:patch",
      "movies:patch",
      "movies:post",
      "movies:delete"
    ]
  }
};
export default rules;
