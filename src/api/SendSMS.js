
const SendSMSAPI=async(mobile, msg)=>{
    var result = await fetch("https://api.textlocal.in/send/?apiKey=4/Ozi5hLtSo-CporQpFWsJDIHWXMqMapLe4Lepa8EU&sender=AgriPL&numbers="+mobile+'&message='+msg)
    .then((response) => response.json())
    .then(async(responseJSON) =>{
        if(responseJSON.status=='success')
        {
            return true;
        }
        else
        {
            return false;
        }
    })
    .catch(err => {
        console.error(err);
    });
    return result;
}

export {SendSMSAPI};

