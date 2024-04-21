import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
//import { faBroadcastTower,faChartBar  } from "@fortawesome/free-solid-svg-icons";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();
  /*
  let color: string;
  switch (options.color) {
    case 'red':
      color = theme.palette.redBase;
      break;
    case 'green':
      color = theme.palette.greenBase;
      break;
    case 'blue':
      color = theme.palette.blue95;
      break;
  }
*/

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div className="row">
        <br />
        <br />
        <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto" style={{ backgroundColor: '#2092ed' }}>
          <br />
          <a href="http://localhost:3001/ad" className="ad-item card border-0 card-ad shadow-lg" target="_blank">
            <div className="card-body d-flex align-items-end flex-column text-right">
              <h4>Anomaly detection (AD)</h4>
              <p className="w-75">Anomaly detection</p>
            </div>
          </a>
        </div>

        <div className="col-lg-6 col-md-8 mb-5 mb-lg-0 mx-auto" style={{ backgroundColor: '#28a745' }}>
          <br />
          <a
            href="http://localhost:3001/dtm"
            className="ad-item card border-0 card-statistics shadow-lg"
            target="_blank"
          >
            <div className="card-body d-flex align-items-end flex-column text-right">
              <h4>Data traffic monitoring (DTM)</h4>
              <p className="w-75">Data traffic monitoring</p>
            </div>
          </a>
        </div>
      </div>

      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div
            className={css`
              font-size: ${theme.typography.size[options.seriesCountSize]};
            `}
          >
            Number of series: {data.series.length}
          </div>
        )}
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
