const getReqConf = (method, body) => {
        let reqConf = {
            method,
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            }
        }

        if (body) {
            reqConf.body = JSON.stringify(body);
        }

        return reqConf;
    }

export const getApi = ()=>{    
    
    const reqUrl = "http://localhost:8081/api/createProfile";
    const reqConf = getReqConf('GET');
    console.log('did mount')
     return fetch(reqUrl, reqConf).then(result => {
        return result.json()
        }) 
       
} 