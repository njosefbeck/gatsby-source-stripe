# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
- Add plugin information for the Stripe library as recommended [here](https://github.com/stripe/stripe-node#writing-a-plugin).
- Change how we call the Stripe API list methods to use auto-pagination as described [here](https://github.com/stripe/stripe-node#auto-pagination).
- Change `fileUploads` API call to `files` and add missing endpoints for getting Stripe data (i.e. incorporate updates made to the Stripe API).

## 1.2.0 - 2018-10-09
### Changed
- Add CHANGELOG.
- Fix issue where pagination wouldn't stop when calling Stripe methods. Fixed by @raae.
- Add gatsby v1+ as peer dependency as recommended [here](https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/migrating-from-v1-to-v2.md#for-plugin-maintainers).
- Rename `boundActionCreators` to `actions` as part of [Gatsby v2 migration](https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/migrating-from-v1-to-v2.md#rename-boundactioncreators-to-actions).