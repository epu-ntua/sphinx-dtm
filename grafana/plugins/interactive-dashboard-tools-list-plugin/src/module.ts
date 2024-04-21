import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, SphinxTools } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  let options;

  for (let i = 0, n = SphinxTools.length; i < n; ++i) {
    if(i == 0){
      options = builder.addTextInput({
        path: `sphinxToolsUrls[${i}]`,
        name: SphinxTools[i][0],
        description: 'Change the heading content of the table ',
        defaultValue: SphinxTools[i][2],
      });  
    } else if (i == 1){
      options = builder.addTextInput({
        path: `sphinxToolsUrls[${i}]`,
        name: SphinxTools[i][0],
        description: 'Background color of the heading ',
        defaultValue: SphinxTools[i][2],
      });  
    } else if (i == 2){
      options = builder.addTextInput({
        path: `sphinxToolsUrls[${i}]`,
        name: SphinxTools[i][0],
        description: 'Background color of the odd rows ',
        defaultValue: SphinxTools[i][2],
      });  
    } else if (i == 3){
      options = builder.addTextInput({
        path: `sphinxToolsUrls[${i}]`,
        name: SphinxTools[i][0],
        description: 'Background color of the even rows ',
        defaultValue: SphinxTools[i][2],
      });  
    } else {
      if (i%2==0){
        options = builder.addTextInput({
          path: `sphinxToolsUrls[${i}]`,
          name: SphinxTools[i][0],
          description: 'URL to access the front end of ' + SphinxTools[i][0],
          defaultValue: SphinxTools[i][2],
        });    
      } else {
        options = builder.addTextInput({
          path: `sphinxToolsUrls[${i}]`,
          name: SphinxTools[i][0],
          description: 'Short description of the component',
          defaultValue: SphinxTools[i][2],
        });    
      }
    }
  }
  return options;
});
