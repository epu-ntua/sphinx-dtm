class Auth{

    ACCESS_TOKEN_NAME = "ACCESS_TOKEN_NAME";
    //CONFIG_SSO = 1;

        isAuthenticated() {
        console.log("Rezultat");
        console.log(window._env_.REACT_APP_SPHINX_SSO_API_URL);
        console.log(window._env_.REACT_APP_CONFIG_SSO);
        if ( window._env_.REACT_APP_CONFIG_SSO  == 0) {
            return true;
        }
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('ticket')

        if (token !== null){
            // try, verify if token is already in localstorage
            let tokenStored = sessionStorage.getItem(this.ACCESS_TOKEN_NAME);
            if(tokenStored !== null){
                let split = tokenStored.split(".");
                let oldToken = split[0];
                if (oldToken === token ){
                    let ok =  this.valid(oldToken,split[1]);
                    if (!ok){
                        sessionStorage.removeItem(this.ACCESS_TOKEN_NAME);
                    }else{
                        return true;
                    }
                }
            }
            return this.valid(token,null);
        }else{
            let tokenStored = sessionStorage.getItem(this.ACCESS_TOKEN_NAME);
            if (tokenStored!=null){
                let split = tokenStored.split(".");
                let ok =  this.valid(split[0],split[1]);
                if (!ok){
                    sessionStorage.removeItem(this.ACCESS_TOKEN_NAME);
                }
                return ok;
            }else{
                return false;
            }
        }
    }

    requestedservice(){
        let url = window.location.href;
        if(process.env.PUBLIC_URL) {
            // if the app is deployed in a folder, remove the folder from href
            url = url.replace(process.env.PUBLIC_URL, "");
        }

        // now, url looks like http://domain/dtm?ticket=... or
        // http://domain/dtm/instances
        let tokens = url.split("/");
        let service = tokens[3];
        service = service.split("?")[0];

        return service.toUpperCase();
    }

    valid(token,date){
        if (date === null){
            let url = `${ window._env_.REACT_APP_SPHINX_SSO_API_URL}/Authorization?requestedservice=${this.requestedservice()}&requestedticket=${token}`;
            return fetch(url, {
                method: 'GET',
            }).then(response => response.json())
                .then(jsonData => {
                    let ok =  Object.keys(jsonData.data).length === 0;

                    if (ok) {
                        sessionStorage.setItem(this.ACCESS_TOKEN_NAME, token + "." + Date.now());
                    }else{
                        sessionStorage.removeItem(this.ACCESS_TOKEN_NAME);
                    }

                    return ok;
                })
        }else{
            // check if if the token is expired
            let time = Date.now();
            let tokenDate = date;
            let diff = this.diffMinutes(time, tokenDate);
            if (diff>30){
                return false;
            }else {
                return true;
            }
        }
    }

    diffMinutes(dt2, dt1) {
        let diff =(dt2 - dt1) / 1000;
        diff /= 3600;
        return Math.abs(Math.round(diff));
    }

}

export default new Auth();