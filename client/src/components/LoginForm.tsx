import Button from "./Button";
import TextInput from "./TextInput";

function LoginForm() {
  return (<div className='auth-form'>
    <TextInput label='Email' />
    <TextInput label='Password' />
    <Button>Log In</Button>
  </div>)
}

export default LoginForm