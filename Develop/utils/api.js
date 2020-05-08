const fs = require("fs");
const axios = require("axios");

const api = function (username) {


  return axios
    .get(`https://api.github.com/users/${username}`)
    .then(function (res) {
      // console.log(res.data);
      const profilePic = res.data.avatar_url
      
      return profilePic
      

     
    });
};


module.exports = api;
// api("codelucid");