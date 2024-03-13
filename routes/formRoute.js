const express=require("express")

const {FormValidation} =require("../controllers/userFormController")

const router=express.Router()

router.post('/validate', FormValidation)


module.exports=router