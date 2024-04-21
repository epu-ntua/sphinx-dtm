import React from 'react';
import { PanelProps } from '@grafana/data';
import { SphinxTools } from './types';
import { SimpleOptions } from './types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import './RightPanel.css';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();

  const rows: JSX.Element[] = [];
  
  for (let i = 4, n = options.sphinxToolsUrls.length; i < n; ++i) {
    if (i % 2 == 0) {
      let backgroundColorStyle = i % 2 ? options.sphinxToolsUrls[2] : options.sphinxToolsUrls[3];
      var tooltipObject = options.sphinxToolsUrls[i + 1];

      let sphinxToolUrl = options.sphinxToolsUrls[i];
      if (sphinxToolUrl) {
        rows.push(
          <tr style={{ backgroundColor: backgroundColorStyle }} key={i}>
            <th scope="row">
              <a className="toolElement" onClick={ (e) => window.open(sphinxToolUrl.replace('{ticket}', window.localStorage.getItem('sphinx_sm_ticket') || ''))} title={tooltipObject}>
                {SphinxTools[i][0]}
              </a>
            </th>
          </tr>
        );
      }
    }
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: 100%;
          height: 100%;
        `
      )}
    >
      <div className="RightPanel border border-primary">
        <table className="table">
          <thead>
            <tr style={{ backgroundColor: options.sphinxToolsUrls[1] }}>
              <th scope="col" style={{ fontSize: '20px' }}>
                {options.sphinxToolsUrls[0]}
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
  };
});
