import React from "react";
import { useStore } from "../store/store";

const INTENTIONS = {
  LOGIN: "login",
  SIGNUP: "signup",
};

type Props = {};

const shouldLogin = (intention: string) => intention === INTENTIONS.LOGIN;
const shouldSignup = (intention: string) => intention === INTENTIONS.SIGNUP;

const Signup = () => {
  const { signup } = useStore();
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signup(name, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control w-full max-w-xs mb-2">
        <label className="label">
          <span className="label-text">What is your name?</span>
        </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs mb-6">
        <label className="label">
          <span className="label-text">Choose a password?</span>
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*****"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs mb-6">
        <input type="submit" className="btn btn-primary" value="Signup" />
      </div>
    </form>
  );
};

const Login = () => {
  const { login } = useStore();
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(name, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control w-full max-w-xs mb-2">
        <label className="label">
          <span className="label-text">What is your name?</span>
        </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs mb-6">
        <label className="label">
          <span className="label-text">What is your password?</span>
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*****"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs mb-6">
        <input type="submit" className="btn btn-primary" value="Login" />
      </div>
    </form>
  );
};

export default function AuthActions({}: Props) {
  const [intention, setIntention] = React.useState(INTENTIONS.LOGIN);

  const loginIntent = shouldLogin(intention);
  const signupIntent = shouldSignup(intention);

  const actions = [
    {
      label: "Login",
      action: INTENTIONS.LOGIN,
      intent: loginIntent,
    },
    {
      label: "Signup",
      action: INTENTIONS.SIGNUP,
      intent: signupIntent,
    },
  ];

  return (
    <div>
      <div className="tabs tabs-boxed">
        {actions.map((action) => (
          <button
            onClick={() => setIntention(action.action)}
            key={action.action}
            className={`tab ${action.intent ? "tab-active" : ""}`}
          >
            {action.label}
          </button>
        ))}
      </div>

      {loginIntent && <Login />}
      {signupIntent && <Signup />}
    </div>
  );
}
