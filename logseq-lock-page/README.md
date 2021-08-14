## logseq-lock-page

### Purpose
- To have the ability to lock pages - will be useful when it contains secrets.

### MVP
- Have a lock and unlock button for pages ONLY.
- Read the metadata of a page and lock the page if it's true.
- The feature is basically to mask the content to be viewed. The data can still be accessed by hacking the page HTML content or by opening the file from the filesystem.

### Limitation
- The lock and unlock button does not update the page metadata - this is due the limitation of the Logseq plugin API, unable to find one to update page properties.
- The tooltip will show the locked page content - unable to find an API to listen to the event and mask the content on the tooltip pop up.
- Search will still show locked page content.

### Demo
![](demo.mov)

### How to use
- Add metadata into the page that you want to lock:
```
---
locked:true/false
---
```
- Refresh the page or revisit the page. The page content will be locked.
- **NOTE**
  - The lock and unlock button will not add/update/remove the page properties. This will need to be done manually.

### Future work
- Explore the limitation and improve the plugin.
- Add a feature to have password to unlock the page.
- I'm happy to collab with anyone to enhance this plugin. Feel free to drop a comment on this post; [discuss.logseq]().