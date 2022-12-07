const serverURL = 'https://svfarmer.azurewebsites.net/index.php/api/GeoTaging/saveUserProfileDetails';

const updateProfileAPI=async(userDetail)=>{
    const formData = new FormData();
    formData.append('mobile',userDetail.mobile)
    formData.append('fullName',userDetail.fullName)
    formData.append('email',userDetail.email)
    formData.append('address',userDetail.address)
    formData.append('state',userDetail.state)
    formData.append('city',userDetail.city)
    formData.append('pin',userDetail.pin)
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

export {updateProfileAPI};

