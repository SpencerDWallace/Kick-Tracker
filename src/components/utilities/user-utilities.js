import axios from 'axios'

const APIURL = 'https://kicktracker-backend.herokuapp.com/'; 

const signInStatus = async ()=>{
    let token = localStorage.getItem('token');
    if(token){
      try {
        const {data} = await axios.get(APIURL + `api/v1/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        //console.log(data)
        if(data.success === true){
            return true;
        }
        else{
            return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
    return false;
}

const userInfo = async ()=>{
  let token = localStorage.getItem('token');
  if(token){
    try {
      let {data} = await axios.get(APIURL + `api/v1/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(data)
      data.token = token;
      (data.success) ? data.isLoggedIn = true : data.isLoggedIn = false;
      return data;
    } catch (error) {
      console.log(error);
    }

  }
  const data = {success:false, isLoggedIn:false};
  return data;
}


const signUserOut = async ()=>{
    let token = localStorage.getItem('token');
    if(token){
      let signedIn = await signInStatus();
      if(signedIn)
        localStorage.removeItem('token');
    }
    window.location = "/";
  }

 

export{signInStatus, userInfo, signUserOut, APIURL};
