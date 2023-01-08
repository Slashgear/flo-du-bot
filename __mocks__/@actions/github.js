module.exports = {
  getOctokit: jest.fn().mockReturnValue({}),
  context: {
    payload: {
      pull_request: {
        number: 42,
        title: "foo",
      },
    },
    repo: {
      owner: "John Doe",
    },
  },
};
