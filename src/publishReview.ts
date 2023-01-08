import { debug, getInput } from "@actions/core";
import { context } from "@actions/github";
import { github } from "./octokitClient";
import { BOT_STATUS, STATUS } from "./getBotReaction";

const POSITIVE_MESSAGES = [
  `![clap clap](https://media.giphy.com/media/l3q2XhfQ8oCkm1Ts4/giphy.gif)`,
  `![hackerman](https://media.giphy.com/media/3knKct3fGqxhK/giphy.gif)`,
  `![matrix](https://media.giphy.com/media/eIm624c8nnNbiG0V3g/giphy.gif)`,
  `![joie](https://media.giphy.com/media/rl7Q4gxngrxVC/giphy.gif)`,
  `![content](https://media.giphy.com/media/3joOYUPuTqXPsDytNm/giphy.gif)`,
  `![nice](https://media.giphy.com/media/BaDsH4FpMBnqdK8J0g/giphy.gif)`,
  `![party](https://media.giphy.com/media/l3q2zbskZp2j8wniE/giphy.gif)`,
  `![keyboard](https://media.giphy.com/media/Hcw7rjsIsHcmk/giphy.gif)`,
  `![bravo](https://media.giphy.com/media/l9Tllo1thElT5gvVOU/giphy.gif)`,
  `![harry potter](https://media.giphy.com/media/Swx36wwSsU49HAnIhC/giphy.gif)`,
  `![goodenough](https://media.tenor.com/E7pG0xll1dUAAAAC/david-goodenough-joueur-du-grenier.gif)`,
];

const TEST_THIS_PLEASE = [
  `![radar](https://media.giphy.com/media/8TL7DBsPtEXqo/giphy.gif)`,
  `![police](https://media.giphy.com/media/81xwEHX23zhvy/giphy.gif)`,
  `![you da best](https://media.giphy.com/media/12vJgj7zMN3jPy/giphy.gif)`,
  `![panda](https://media.giphy.com/media/EtB1yylKGGAUg/giphy.gif)`,
  `![bucher](https://media.giphy.com/media/bZHv7NWtiakmI/giphy.gif)`,
  `![matinal](https://media.giphy.com/media/LiuomYS6ojKrm/giphy.gif)`,
  `![what](https://media.giphy.com/media/Ro5fB5rRvkICI/giphy.gif)`,
  `![no](https://media.giphy.com/media/12UqNaDkfpo520/giphy.gif)`,
  `![what have I done](https://media.giphy.com/media/10cvJCkgoH4AEM/giphy.gif)`,
  `![where are the tests](https://media.giphy.com/media/120kDB2lOrYnV6/giphy.gif)`,
  `![on en a gros](https://media.giphy.com/media/zrCSvFfl2fP7W/giphy.gif)`,
  `![leodagan](https://media.giphy.com/media/elzt03Q2Hg568/giphy.gif)`,
];

const EXPLAIN_TEXT = `
> It seems that you are doing a feature or a fix pull request, you need to add some tests (E2E, integration or unit) !
`;

const INTRO_TEXT = `
:robot: Flo du BOT is watching over Pull Request
`;

const pickRandom = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export const publishReview = (status: BOT_STATUS) => {
  let event = status;
  let message = INTRO_TEXT;
  message += pickRandom(
    status === STATUS.REQUEST_CHANGES ? TEST_THIS_PLEASE : POSITIVE_MESSAGES
  );

  if (status === STATUS.REQUEST_CHANGES) {
    message += EXPLAIN_TEXT;
  }

  debug(`Publishing message: ${message}`);

  if (
    status === STATUS.REQUEST_CHANGES &&
    getInput("reviewEvent") === STATUS.COMMENT
  ) {
    event = STATUS.COMMENT;
  }

  if (context.payload.pull_request) {
    github.rest.pulls.createReview({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.payload.pull_request?.number,
      body: message,
      event,
    });
  }
};
