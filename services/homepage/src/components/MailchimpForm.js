import React from "react";
const subscribeArrow = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/arrow_forward-white.svg';
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
      {status === "sending" && <div style={{ color: "#fff" }}>Subscribing...</div>}
      {status === "error" && <div style={{ color: "red" }}>Invalid email or you have already subscribed for the newsletter</div>}
      {status === "success" && <div style={{ color: "#1CD3C6" }}>Thank you for subscribing!</div>}
    </div>
  );
};

export default MailchimpForm;
