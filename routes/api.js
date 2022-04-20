const express = require("express");
const router = express.Router();
const Address = require("../models/Address.js");
const compiler = require('../scripts/compile.js');
const deployer = require('../scripts/deploy.js');

router.post("/test", (req, res) => {
    res.json({
      user: req.body.userAddress
    });
  });
  
router.get("/getAll",(req,res)=>{
    Address.find({}).then(data=>{
        res.json(data);
    }).catch(err => console.log(err));
});
  
router.get("/test",(req,res)=>{
    data = compiler('token');
    address2 = deployer(data);
    res.json(address2);
});

router.post("/createToken", (req,res)=>{

//compile and deploy with req params
// req.body.userAddress
// req.body.chainID
// const abi = contractFile.abi;


const newAddress = new Address({
    user: req.body.userAddress,
    token: "",// token address from deployment
    chainID: req.body.chainID
});
newAddress.save()
            .then(data => res.json(data))
            .catch(err => console.log(err));
});

router.post("/createPad", (req,res)=>{

//compile and deploy with req params
// req.body.userAddress
// req.body.chainID
// req.body.tokenAddress

updateAddress = {};
updateAddress.user = req.body.userAddress;
updateAddress.token = req.body.tokenAddress;
updateAddress.launchpad = ""; // launchpad address acquired from deployment
updateAddress.chainID = req.body.chainID;

Address.findOneAndUpdate(
    { user: req.body.userAddress },
    { $set: updateAddress },
    { new: true }
).then(profile => res.json(profile));

});

module.exports = router;