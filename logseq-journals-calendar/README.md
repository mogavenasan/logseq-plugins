## Logseq Journal Calendar

- This is a fork of [Logseq Plugin sample](https://github.com/logseq/logseq-plugin-samples/tree/master/logseq-journals-calendar).
- There are a couple of enhancement:
  - The calendar theme will follow the [Dracula theme](https://github.com/dracula/logseq).
  - Bugfix:
    - Previously, if we click on the date that there is no journal, the plugin will open an invalid journal page.
    - This version will show a message and will not do anything.

### Installation Steps

- `npm install && npm run build` in terminal to install dependencies.
- `Load unpacked plugin` in Logseq Desktop client.
