
const mongoose=require("mongoose")

const {Schema} =mongoose


const FormSchema =  mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return value.trim() !== '' && !value.trim().split('').some(char => !/[a-zA-Z ]/.test(char));
        },
        message: 'First name must contain only letters and spaces.',
      },
    },
    lastName: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return value.trim() !== '' && !value.trim().split('').some(char => !/[a-zA-Z ]/.test(char));
        },
        message: 'Last name must contain only letters and spaces.',
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return value.trim() !== '' && value.trim().startsWith('+') && value.trim().length >= 12 && value.trim().length <= 14 && !isNaN(value.trim().substring(1));
        },
        message: 'Phone number must start with "+" and be between 12 to 14 characters long.',
      },
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(value) {
          return value.trim() !== '' && value.includes('@') && value.includes('.') && value.indexOf('@') < value.lastIndexOf('.');
        },
        message: 'Invalid email address.',
      },
    },
  });
  


const UserForm=mongoose.model("Validation",FormSchema)

module.exports=UserForm;
