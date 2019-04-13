# Contributing to gatsby-source-stripe

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to the gatsby-source-stripe plugin. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [njosefbeck@gmail.com](mailto:njosefbeck@gmail.com).

## What should I know before I get started?

Before contributing to this project, take the time to read through the [README](README.md). Additionally, be sure you are familiar with [Gatsby](https://gatsbyjs.org). Specifically, read through the Gatsby documentation on [creating a source plugin](https://www.gatsbyjs.org/docs/create-source-plugin/).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out [the required template](ISSUE_TEMPLATE.md), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting A Bug Report

* **Check the [README](README.md).** You might be running an un-supported version of Node or Gatsby with this plugin. The README gives details on what versions the plugin works with.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and provide the following information by filling in [the template](ISSUE_TEMPLATE.md).

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. If you use the keyboard while following the steps, **record the GIF with the [Keybinding Resolver](https://github.com/atom/keybinding-resolver) shown**. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* **Did the problem start happening recently** (e.g. after updating to a new version of gatsby-source-stripe) or was this always a problem?
* If the problem started happening recently, **can you reproduce the problem in an older version of Atom?** What's the most recent version in which the problem doesn't happen?
* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion and find related suggestions.

#### Before Submitting An Enhancement Suggestion

* **Check the [CHANGELOG](CHANGELOG.md)** unreleased section to see if your enhancement is already listed, but just not released yet.
* **Perform a search** through the issues to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and provide the following information by filling in [the template](ISSUE_TEMPLATE.md).

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Explain why this enhancement would be useful** to most gatsby-source-stripe users.

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through the `help-wanted` issues:

* [Help wanted issues][help-wanted] - issues which should be a bit more involved than `beginner` issues.

### Coding Guidelines

Several notes to keep in mind as you add code to this project.

* If you add any dependencies to the project via package.json, keep in mind that we only use absolute versions of packages. For example, `2.2.6` instead of `^2.2.6`. This helps maintain consistency across npm installs. Our `.npmrc` file also helps enforce this.
* For commits, we prefer the active voice / imperative mood. For more info (and a great article), check [here](https://chris.beams.io/posts/git-commit/#imperative)
* Be sure to use the `npm run lint` and `npm run format` commands often, but especially before submitting a PR.

## Attribution

This document is an edited version of [Atom's CONTRIBUTING.md](https://github.com/atom/atom/blob/master/CONTRIBUTING.md).
