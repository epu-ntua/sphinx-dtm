import React from 'react';
import {useTranslation, withTranslation} from 'react-i18next';
import i18next from "i18next";
import Cookies from "js-cookie";
import ReactTooltip from "react-tooltip";

class Navbar extends React.Component{

    constructor(props) {
        super(props);
        this.state = { value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({value: value});
        i18next.changeLanguage(value);

        Cookies.set('i18next', value);
        ReactTooltip.show(value);
    }

    render(){
        let selectedOptionId = localStorage.getItem("i18nextLng");
        const selectLng = [
            {value: 'en', name: 'En – Engleza'},
            {value: 'ro', name:'Ro – Româna'},
            {value: 'el', name:'Ελ - Ελληνικά'}
        ];
        return(
            <header className="">
                <nav className="container navbar navbar-dark">
                    <a className="navbar-brand" href="/">
                        <img className="logo" src={process.env.PUBLIC_URL + '/sphinx-logo.png'} />
                    </a>
                    <a className="navbar-brand" href="/">
                        {/* Interactive Dashboards
                        &nbsp; */}
                        {/*
                        <span className="badge badge-warning">{process.env.REACT_APP_SPHINX_ID_ENV}</span>
                        */}
                    </a>
                    <select id="languageList" name="languageList" className="dropdown-lng language"
                            defaultValue={selectedOptionId} onChange={this.handleChange} data-tip data-for="selectTip" >
                        <option value="en">En</option>
                        <option value="ro">Ro</option>
                        <option value="el">Ελ</option>
                    </select>
                    <ReactTooltip id="selectTip" place="bottom" effect="float">
                        {selectLng.map(lng => (
                            <option key={lng.value} value={lng.name}>
                                {lng.name}
                            </option>
                        ))}
                    </ReactTooltip>
                </nav>
            </header>
        )
    }
}

export default withTranslation()(Navbar);

