const express = require("express");
const router = express.Router();
const Address = require("../models/Address.js");
const compiler = require('../scripts/compile.js');

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

    // res.json(req.body.userAddress);
    const tokenName = "saf";
    const tokenSymbol = "SF";
    const tokenDecimal = 18;
    const tokenSupply = 10002200;
    const uniSwapRouter = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";

    data = compiler('token');
    (async () => {
        address2 = await deployer(data, tokenName, tokenSymbol, tokenDecimal, tokenSupply, uniSwapRouter);
        res.json(address2);
    })()
    
});

router.get("/getTokenContract",(req,res)=>{
    data = compiler('token');
    res.json(data);
});

router.post("/addTokenAddress", (req,res)=>{

    const newAddress = new Address({
        user: req.body.userAddress,
        token: req.body.tokenAddress, // token address from deployment
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