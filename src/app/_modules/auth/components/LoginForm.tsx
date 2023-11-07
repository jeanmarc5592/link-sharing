"use client"

import Button from "../../common/components/Button"
import Input from "../../common/components/Input"
import Typography from "../../common/components/Typography"
import AuthCard from "./AuthCard"

const LoginForm = () => {

  return (
    <AuthCard>
      <Typography variant="Heading M" className="mb-4">Login</Typography>
      <Typography className="mb-10 sm:mb-12">Add your details below to get back into the app</Typography>

      <Input 
        label="Email address" 
        inputProps={{ placeholder: "e.g alex@email.com" }}
      />

      <Input 
        label="Password" 
        inputProps={{ placeholder: "Enter your password", type: "password" }}
      />

      <Button>Login</Button>

      <Typography className="text-center">
        Don&apos;t have an account? <a className="text-custom-purple" href="/auth/signup">Create account</a>
      </Typography>
    </AuthCard>
  )
}

export default LoginForm
