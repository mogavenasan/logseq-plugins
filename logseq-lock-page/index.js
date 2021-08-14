function createModel() {
  return {
    lock() {
      const key = logseq.baseInfo.id;
      console.log('Page locked.');
      logseq.App.showMsg("Page locked.");
      logseq.provideUI({
        key: 'lock-page',
        path: '.flex.flex-row.space-between',
        template: `
          <button data-on-click="unlock" style="opacity: .6; display: inline-flex; padding-left: 12px; position: relative; transform: scale(0.75);">
            <i id="lock" class="gg-lock"></i>
          </button>
        `,
      });
      logseq.provideStyle(`
        div[data-injected-ui=overlay-lock-page-${key}] { display: inline-flex; }
      `);
    },
    unlock() {
      const key = logseq.baseInfo.id;
      console.log('Page unlocked.');
      logseq.App.showMsg("Page unlocked.");
      logseq.provideUI({
        key: 'lock-page',
        path: '.flex.flex-row.space-between',
        template: `
          <button data-on-click="lock" style="opacity: .6; display: inline-flex; padding-left: 14px; position: relative; transform: scale(0.75); top: 4px;">
            <i id="lock" class="gg-lock-unlock"></i>
          </button>
        `,
      });
      logseq.provideStyle(`
        div[data-injected-ui=overlay-lock-page-${key}] { display: none; }
      `);
    },
  };
}

function getPage(a, b) {
    var page_name = a.parameters.path.name;

    if (page_name) {
      var page_details = logseq.Editor.getPage(page_name)

      page_details
      .then(values => {
        for (const [key, value] of Object.entries(values)) {
          if (key == 'journal?') {
            var is_journal = value
          };
          if (key == 'id') {
            var page_id = value
          };
          if (key == 'properties') {
            var is_locked = value["locked"]
          };
        };

        if (!is_journal) {
          const key = logseq.baseInfo.id;

          console.log("This is a page");
          console.log(page_id);
          console.log(is_locked);

          logseq.provideStyle(`
            div[class="content"] { position: relative; }
          `);

          logseq.provideStyle(`
            @import url('https://css.gg/lock.css');
            @import url('https://css.gg/lock-unlock.css');

            div[data-injected-ui=lock-page-${key}] {
              display: inline-flex;
              font-weight: 500;
              position: relative;
              top: 0px;
            }

            div[data-injected-ui=lock-page-${key}]:hover {
              opacity: .9;
            }

            div[data-injected-ui=overlay-lock-page-${key}] {
              position: absolute;
              display: none;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: var(--ls-secondary-background-color);
              z-index: 1;
              justify-content: center;
            }
          `);

          logseq.provideUI({
            key: 'lock-page',
            path: '.flex.flex-row.space-between',
            template: `
              <button data-on-click="lock" style="opacity: .6; display: inline-flex; padding-left: 14px; position: relative; transform: scale(0.75); top: 4px;">
                <i id="lock" class="gg-lock-unlock"></i>
              </button>
            `,
          });

          logseq.provideUI({
            key: 'overlay-lock-page',
            path: '.content',
            template: `
              <span style="opacity: .6; display: inline-flex; align-items: center; text-align: center;">This page is locked.</span>
            `,
          });

          if (is_locked) {
            logseq.provideUI({
              key: 'lock-page',
              path: '.flex.flex-row.space-between',
              template: `
                <button data-on-click="unlock" style="opacity: .6; display: inline-flex; padding-left: 12px; position: relative; transform: scale(0.75);">
                  <i id="lock" class="gg-lock"></i>
                </button>
              `,
            });

            logseq.provideStyle(`
              div[data-injected-ui=overlay-lock-page-${key}] { display: inline-flex; }
            `);
          };
        };

        if (is_journal) {
          console.log("This is not a page");

          const key = logseq.baseInfo.id;

          logseq.provideUI({
            key: 'lock-page',
            path: '.flex.flex-row.space-between',
            template: ``,
          });
        };
      })
      .catch(err => { console.log(err) });
    }
}

function main() {
  const key = logseq.baseInfo.id;

  logseq.App.onRouteChanged(getPage);
}

logseq.ready(createModel()).then(main).catch(console.error);
