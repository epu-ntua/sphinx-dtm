import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, Inputs } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'urlList[0]',
      name: 'ID Endpoints URL',
      description: 'Provide the URL to access the ID Endpoints',
      defaultValue: 'https://sphinx-toolkit.intracom-telecom.com:8443/sphinx/id',
    })
    .addTextInput({
      path: 'urlList[1]',
      name: 'Grafana backend APIs',
      description: 'Provide the URL to access the Grafana backend APIs',
      defaultValue: 'https://sphinx-toolkit.intracom-telecom.com:8443/interactive-dashboards',
    })
    .addTextInput({
      path: 'urlList[2]',
      name: 'User manual link',
      description: 'Provide the URL to access user manual',
      defaultValue: 'https://sphinx-toolkit.intracom-telecom.com/interactive-dashboards/public/manuals/USER_MANUAL.pdf',
    })
    .addTextInput({
      path: 'urlList[3]',
      name: 'pdf icon',
      description: 'PNG of the PDF icon',
      defaultValue: 'https://sphinx-toolkit.intracom-telecom.com/interactive-dashboards/public/img/pdf.png',
    })
});
