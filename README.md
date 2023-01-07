<h1 align="center">Welcome to flo-du-bot Github Action👋</h1>
<p>
  <a href="https://github.com/Slashgear/flo-du-bot/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/Slashgear\_" target="_blank">
    <img alt="Twitter: Slashgear_" src="https://img.shields.io/twitter/follow/Slashgear_.svg?style=social" />
  </a>
  <a href="https://github.com/Slashgear/flo-du-bot/actions/workflows/ci.yml" target="_blank">
    <img alt="Continous Integration" src="https://github.com/Slashgear/flo-du-bot/actions/workflows/ci.yml/badge.svg" />
  </a>
</p>

> Github action to ensure that test are added to a project for new features or bug fixes.
>
> By default, when a pull request is opened and is name contains `feat` or `fix`, the action will fail if the list of files changes does not match

## Context of this action

With my colleague [Florent Dubost](https://github.com/fdubost), we try to instill in our development teams the need to always try to implement automated tests in the Pull Requests on which they modify the product of our tools.

**This is part of our "team rules" that we try to respect.**

As we presented in the article in french ["How not to throw away a frontend application every two years?](https://tech.bedrockstreaming.com/2021/09/01/bonnes-pratiques-web.html), we always try to automate our team rules so that they don't rely on people who are then the guarantor of the respect of these rules.

Also explained in this video conference in french.
[![youtube video screenshot](https://img.youtube.com/vi/t36UqNSmybM/0.jpg)](https://www.youtube.com/watch?v=t36UqNSmybM)

With my colleague [Mickaël Alves](https://github.com/CruuzAzul), we took advantage of an R&D day to implement the rule _"Always add/modify tests when we make a fix or develop a new feature"_ that Florent was making sure we respected but with a Github action.
This is why we named the project `flo-du-bot`, linked to the name of the person who inspired this idea.

## Usage

This action allows you to include a title check of a pull request automatically. This action only works on `pull_request` events.
Add this action on your pull request event workflows.

```yaml
steps:
  - uses: Slashgear/flo-du-bot@v1.0.0
    with:
      prTitlePattern: "(feat|fix)" # Regexp the title should match. (default)
      testFileExtensionPattern: "(spec.js|int.js|.feature|test.js)" # Regexp of modified files extensions (default)
      sourceFilePattern: "src/.*.(js|ts)" # Regexp of source files edition detection. (default)
      reviewEvent: "REQUEST_CHANGES" # Type of event triggered by the bot in the pullRequest (default) other values: COMMENT for review status comment, NONE if you don't want it to touch your PR reviews
      token: $ # Github token used (you could pass ${{ secrets.GITHUB_TOKEN }})
```

## Author

👤 **Slashgear**

- Website: https://blog.slashgear.dev/
- Twitter: [@Slashgear\_](https://twitter.com/Slashgear_)
- Github: [@Slashgear](https://github.com/Slashgear)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Slashgear/action-check-pr-title/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Slashgear](https://github.com/Slashgear).<br />
This project is [MIT](https://github.com/Slashgear/action-check-pr-title/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
