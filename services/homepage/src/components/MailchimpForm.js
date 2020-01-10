import React from "react";
const subscribeArrow = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/arrow_forward-white.svg';
const success = require('../images/success.svg');
const error = require('../images/error.svg');
// a basic form
const MailchimpForm = ({ status, onSubmitted }) => {
  let input;
  const submit = () =>
    input &&
    input.value.indexOf("@") > -1 &&
    onSubmitted({
      EMAIL: input.value
    });

  return (
    <div className="subscribeForm">
      <input
        ref={node => (input = node)}
        type="email"
        placeholder="Your E-mail Address"
        aria-label="email"
      />
      <button onClick={submit}><img src={subscribeArrow} alt={'Arrow'} /></button>
      {status === "sending" && <div className="sending">Subscribing...</div>}
      {status === "error" && <div className="error"><img src={error} alt={'error'}/>Invalid email or you have already subscribed for the newsletter</div>}
      {status === "success" && <div className="success"><img src={success} alt={'success'}/>Thank you for subscribing!</div>}
    </div>
  );
};

export default MailchimpForm;
