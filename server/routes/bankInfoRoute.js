const express = require("express");
const router = express.Router();
const bankData = require('../data/bankData.json');

router.get('/', (req,res) =>{
  res.status(200).json(bankData);
})

module.exports = router;