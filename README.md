# ExtensionFW - a web browser extension firewall

The ExtensionFw package allows web sites and applications to REQUIRE, ALLOW, or REJECT specific Chromium-based browser extensions. Extension rule violations can be logged, notify the user, ping a beacon, or prevent the page from loading. Please note that this identification technique does not work in Firefox and Safari.

This package is highly experimental at this point and should not be relied upon in any meaningful way.

## Usage
Include between your `<head></head>` tags:
```html
<script src="js/extension-fw.min.js"></script>
```

Define the extensions you wish to identify in an object defined as follows:
```js
const extensions = [
        {
            type: 'Chromium',
            extensions: [
                {
                    name: 'Homework Solver by College Tools',
                    element: 'img',
                    test: 'chrome-extension://iiikmhonbbmbdjfokdmmncdohjionkmf/images/snapshot-new.png',
                    rule: 'REJECT', // REJECT, ALLOW, REQUIRE
                    action: 'log', // log, alert, ping, return, exit
                }
            ],
        }
    ];
```

Instantiate ExtensionFw with that extensions object and run scan();
```js
const extensionFw = new ExtensionFw(extensions);
extensionFw.scan();
```

Further documentation is required, such as what and how to test. This is just the first file added to the repo.

Check out the tests/index.html to see the full example.
