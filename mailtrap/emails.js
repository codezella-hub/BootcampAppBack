const { client ,sender} = require("./mailtrap.config");
const {VERIFICATION_EMAIL_TEMPLATE} = require('./emailTemplates')
const sendVerificationEmail = async (email,verificationToken)=>{
   const recipient = [(email)]
   try{
   const response = await client.send({
         from:sender,
         to: [{ email: email, name: "Utilisateur" }],
         subject: "Verify your email",
         html:  VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
         category: "Email Verification"
   });
   console.log("Email send Succefully ",response);
   }catch(error){
    console.error("Error sending verification email",error);
    throw new Error(`Error sending verification email : ${error}`);
   }
}

module.exports = sendVerificationEmail;
