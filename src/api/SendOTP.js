const serverURL = 'https://svfarmer.azurewebsites.net/index.php/api/GeoTaging/sendotp';

const saveUserFirstTime=async(mobile, otp)=>{
    const formData = new FormData();
    formData.append('mobile',mobile)
    formData.append('otp',otp)
    let obj = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
        },
        body: formData,
    };
    var result = await fetch(serverURL, obj)
    .then((response) => response.json())
    .then((responseJSON) =>{
        return responseJSON;
    })
    .catch(err => {
        console.error(err);
    });
    return result;
}

export {saveUserFirstTime};

