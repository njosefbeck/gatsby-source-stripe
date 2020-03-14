---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: njosefbeck

---

**Prerequisites**

[ ] Put an X between the brackets on this line if you have done all of the following:
  * Read through the README fully.
  * Ensured you are running Node v.10 or above.
  * Made sure you're using at least Gatsby v.2.0.15.
  * Checked that your issue isn't already filed.

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Versions (please complete the following information):**

os: [version]
node: [version]
npm: [version]
gatsby: [version]
gatsby-source-stripe: [version]

**Gatsby config:**

Copy the portion of your Gatsby config for this plugin here. **Do not include your `secretKey`.**

```js
{
  resolve: `gatsby-source-stripe`,
  options: {
    objects: ['Sku', 'Product', 'Customer'],
    secretKey: '...',
    downloadFiles: true,
  }
}
```

**Additional context**
Add any other context about the problem here.
