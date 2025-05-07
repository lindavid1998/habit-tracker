import Button from "./Button";
import TextInput from "./TextInput";
import "../styles/auth.css";

function SignUpForm() {
  return (
    <div className="auth-form">
      <TextInput label="Name" />
      <TextInput label="Email" />
      <TextInput label="Password" type="password" />
      <TextInput label="Confirm Password" type="password" />
      <Button>Sign Up</Button>
    </div>
  );
}

export default SignUpForm; 