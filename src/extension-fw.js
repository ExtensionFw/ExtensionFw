/**
 * ExtensionFW @VERSION | Copyright (C) 2024 Matt Simpson
 */
class ExtensionFw {
    constructor(extensions) {
        this.UAParser = require('ua-parser-js');

        this.extensions = extensions ?? [
            {
                type: 'Chromium',
                extensions: [
                    // Chromium extensions rules here...
                    // {
                    //     name: 'Homework Solver by College Tools',
                    //     element: 'img',
                    //     test: 'chrome-extension://iiikmhonbbmbdjfokdmmncdohjionkmf/images/snapshot-new.png',
                    //     rule: 'REJECT', // REJECT, ALLOW, REQUIRE
                    //     action: 'log', // log, alert, ping, return, exit
                    // },
                ],
            },
            {
                type: 'Mozilla',
                extensions: [
                    // Mozilla extensions rules here...
                    // @todo Firefox extensions do not currently (and may never) work reliably.
                ],
            },
            {
                type: 'Safari',
                extensions: [
                    // Safari extensions rules here...
                    // @todo Safari extensions do not currently (and may never) work reliably.
                ],
            },
        ];

        this.pingUrl = '';
        this.messages = [];
    }

    setPingUrl(url) {
        this.pingUrl = url;
    }

    getMessages() {
        return JSON.stringify(this.messages, null, 2);
    }

    getExtensionType() {
        const parser = new this.UAParser();
        const browserName = parser.getBrowser().name;
        let extensionType;
        if (['Chrome', 'Chromium', 'OPR', 'Vivaldi', 'Blazer', 'Brave', 'Comodo Dragon', 'Edge', 'Iron', 'Maxthon', 'PhantomJS', 'Silk', 'Swing', 'Rockmelt', 'Yandex', 'Samsung Internet'].some(family => browserName.includes(family))) {
            extensionType = 'Chromium';
        } else if (browserName.includes('Firefox') || browserName.includes('Flock')) {
            extensionType = 'Mozilla';
        } else if (browserName.includes('Safari')) {
            extensionType = 'Safari';
        } else {
            extensionType = 'Unknown';
        }
        return extensionType;
    }

    performAction(actionsStr, message) {
        const actions = actionsStr.split(',');

        actions.forEach(action => {
            switch (action.trim()) {
                case 'alert':
                    alert(message);
                    break;
                case 'ping':
                    const request = new XMLHttpRequest();
                    request.open('GET', this.pingUrl, true);
                    request.send();
                    break;
                case 'return':
                    this.messages.push({
                        action: action.trim(),
                        message: message
                    });
                    break;
                case 'exit':
                    document.body.innerHTML = '';
                    throw new Error(message);
                case 'log':
                default:
                    console.log(message);
                    break;
            }
        });
    }

    scan() {
        const currentExtensionType = this.getExtensionType();

        this.extensions.filter(b => b.type === currentExtensionType).forEach(browser => {

            browser.extensions.forEach(extension => {

                const element = document.createElement(extension.element);

                try {
                    element.src = extension.test;
                } catch (e) {

                }

                element.onload = function () {
                    let msg = '';
                    switch(extension.rule) {
                        case 'REJECT':
                            msg = `Warning: It seems you have '${extension.name}' extension installed for ${browser.type}. Please uninstall it.`;
                            this.performAction(extension.action, msg);
                            break;

                        case 'REQUIRE':
                            // The extension is installed and its rule is 'REQUIRE', so no need to do anything special here
                            break;
                    }
                }.bind(this);

                element.onerror = function () {
                    if(extension.rule === 'REQUIRE') {
                        const msg = `Warning: It seems you do not have the required '${extension.name}' extension installed for ${browser.type}. Please install it.`;
                        this.performAction(extension.action, msg);
                    }
                }.bind(this);
            });
        });
    }
}

module.exports.default = ExtensionFw;
