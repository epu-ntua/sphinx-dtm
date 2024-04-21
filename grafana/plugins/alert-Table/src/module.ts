import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, SphinxTools } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  let options;

  for (let i = 0, n = SphinxTools.length; i < n; ++i) {
    options = builder.addTextInput({
      path: `sphinxToolsUrls[${i}]`,
      name: SphinxTools[i][0],
      description: 'URL to access the front end of ' + SphinxTools[i][0],
      defaultValue: SphinxTools[i][2],
    });
  }

  return options;
});