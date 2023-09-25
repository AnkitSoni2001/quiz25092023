var jwt = require("jsonwebtoken");
require('dotenv').config();

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to the req object
  const token = req.header("auth-token");
  // if token is not present
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valod token" });
  }
  try {
    // or we will verify the user using jwt.verify
    // const JWT_SECRET = "helloiamsecret";
    const data = jwt.verify(token, process.env.JWT_SECRET, (err, res)=>{
      if(err){
        return "token expired";
      }
      return res;
    });
    if(data == "token expired"){
      return res.send({status:"error", data:"token expired"});
    }
    // to retrive the user id
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;
