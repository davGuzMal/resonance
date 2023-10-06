const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "6f2ae20aeb8a98e957901df8a00d3739-us21",
  server: "us21",
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();