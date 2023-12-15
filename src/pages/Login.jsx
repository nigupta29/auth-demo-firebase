import { Fragment, useRef, useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const navigate = useNavigate()

  const emailRef = useRef("")
  const passwordRef = useRef("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, loginWithGoogle } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/dashboard")
    } catch {
      setError("Failed to login!")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setError("")
      setLoading(true)
      await loginWithGoogle()
      navigate("/dashboard")
    } catch {
      setError("Failed to login via Google Account!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <Card className='p-2'>
        <Card.Body>
          <h2 className='text-center mb-4'>Login</h2>
          {error && (
            <Alert variant='danger' className='mb-4' dismissible>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                required
                ref={emailRef}
                placeholder='Enter email'
              />
            </Form.Group>
            <Form.Group className='mb-3' id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                required
                ref={passwordRef}
                placeholder='Enter password'
              />
            </Form.Group>
            <Button
              disabled={loading}
              variant='success'
              className='w-100'
              type='submit'
            >
              Login
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to={"/forgot-password"} className='link-info'>
              Forgot Password?
            </Link>
          </div>
        </Card.Body>
      </Card>
      <Button
        disabled={loading}
        variant='outline-dark'
        className='w-100 my-2'
        type='submit'
        onClick={handleGoogleLogin}
      >
        Login with Google Account
      </Button>
      <div className='w-100 text-center mt-2'>
        Need an account?
        <Link to='/signup' className='link-success mx-1'>
          Sign up
        </Link>
        instead.
      </div>
    </Fragment>
  )
}

export default Login
