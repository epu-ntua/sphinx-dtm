import React from 'react';
import { withTranslation } from 'react-i18next';

class Footer extends React.Component{

    render(){
        const { t } = this.props;
        return(
            <footer className="footer">
                <div className="container">
                    <div className={"d-flex flex-row justify-content-start"}>
                        <span className={""}>
                            <img className="footer-logo" src={process.env.PUBLIC_URL + '/footer.png'} />
                        </span>
                        <span className="text-muted footer-text">
                            {t('common.footer.text')}
                        </span>
                    </div>
                </div>
            </footer>
        )
    }

}
export default withTranslation()(Footer);