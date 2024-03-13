const UserForm=require("../models/userFormModel")
const pdfkit = require('pdfkit');
const fs = require('fs');


const FormValidation=async(req,res)=>{
    try {
        // Validate input
        const { firstName, lastName, phoneNumber, emailAddress } = req.body;
        const newUser = new UserForm({ firstName, lastName, phoneNumber, emailAddress });
        await newUser.validate();
    
        // Save user to MongoDB
        const savedUser = await newUser.save();
    
        // Generate PDF document
        const pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(`./${savedUser._id}.pdf`));
        pdfDoc.text(`First Name: ${savedUser.firstName}`);
        pdfDoc.text(`Last Name: ${savedUser.lastName}`);
        pdfDoc.text(`Phone Number: ${savedUser.phoneNumber}`);
        pdfDoc.text(`Email Address: ${savedUser.emailAddress}`);
        pdfDoc.end();
    
        // Return document path in API response
        res.json({ documentPath: `/${savedUser._id}.pdf` });
      } catch (err) {
        console.log("err")
        res.status(400).json({ error: err.message });
      }
}

module.exports = {
    FormValidation
  };