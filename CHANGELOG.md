# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

- None

## [2.0.2](https://github.com/njosefbeck/gatsby-source-stripe/compare/v2.0.0...v2.0.2) - 2018-11-20
### Changed
- Moved dependencies to devDependencies to avoid dependency pollution.

## [2.0.0](https://github.com/njosefbeck/gatsby-source-stripe/compare/v1.2.1...v2.0.0) - 2018-11-18
### Changed
- This release contains a number of breaking changes.
  - Due to the way we're handling auto-pagination, you must use Node v.10 or higher when using this version of the plugin.
  - When adding Stripe objects to the objects array in `gatsby-config.js`, you must use the object types listed in the README. Thus, the type names have changed.
- Re-write plugin to incorporate [stripe-node](https://github.com/stripe/stripe-node) auto-pagination.
- Update README to include more information about how to use the plugin.
- Update plugin implementation to bring it fully up to date with Stripe API version 2018-11-08. This involves adding some new object types (ex: TopUp, TerminalLocation), and renaming other objects (fileUploads becomes File).
- Add plugin information for the Stripe library as recommended [here](https://github.com/stripe/stripe-node#writing-a-plugin).

## [1.2.1](https://github.com/njosefbeck/gatsby-source-stripe/compare/v1.2.0...v1.2.1) - 2018-11-02
### Changed
- Update stripe dependency to 6.13.0.

## 1.2.0 - 2018-10-09
### Changed
- Add CHANGELOG.
- Fix issue where pagination wouldn't stop when calling Stripe methods. Fixed by @raae.
- Add gatsby v1+ as peer dependency as recommended [here](https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/migrating-from-v1-to-v2.md#for-plugin-maintainers).
- Rename `boundActionCreators` to `actions` as part of [Gatsby v2 migration](https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/migrating-from-v1-to-v2.md#rename-boundactioncreators-to-actions).
- Update [Stripe Node.js Library](https://www.npmjs.com/package/stripe) from 6.8.0 to 6.12.1.