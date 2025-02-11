const { MailtrapClient } = require("mailtrap");
const dotenv = require('dotenv');
dotenv.config();


const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
  endpoint: process.env.MAILTRAP_ENDPOINT
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Louay Ben slimen ",
};


module.exports = {sender,client};











