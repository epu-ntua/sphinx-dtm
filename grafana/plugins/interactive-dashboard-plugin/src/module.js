"use strict";
exports.__esModule = true;
var data_1 = require("@grafana/data");
var SimplePanel_1 = require("./SimplePanel");
exports.plugin = new data_1.PanelPlugin(SimplePanel_1.SimplePanel).setPanelOptions(function (builder) {
    return builder
        .addTextInput({
        path: 'text',
        name: 'Simple text option',
        description: 'Description of panel option',
        defaultValue: 'Default value of text input option'
    })
        .addBooleanSwitch({
        path: 'showSeriesCount',
        name: 'Show series counter',
        defaultValue: false
    })
        .addRadio({
        path: 'seriesCountSize',
        defaultValue: 'sm',
        name: 'Series counter size',
        settings: {
            options: [
                {
                    value: 'sm',
                    label: 'Small'
                },
                {
                    value: 'md',
                    label: 'Medium'
                },
                {
                    value: 'lg',
                    label: 'Large'
                },
            ]
        },
        showIf: function (config) { return config.showSeriesCount; }
    })
        .addRadio({
        path: 'color',
        name: 'Circle color',
        defaultValue: 'red',
        settings: {
            options: [
                {
                    value: 'red',
                    label: 'Red'
                },
                {
                    value: 'green',
                    label: 'Green'
                },
                {
                    value: 'blue',
                    label: 'Blue'
                },
            ]
        }
    });
});
