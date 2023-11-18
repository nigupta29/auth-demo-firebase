import { Fragment, useRef, useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Signup = () => {
  const navigate = useNavigate()

  const emailRef = useRef("")
  const passwordRef = useRef("")
  const passwordConfirmationRef = useRef("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/dashboard")
    } catch {
      setError("Failed to create an account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <Card className='p-2'>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
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
            <Form.Group className='mb-3' id='password-confirmation'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                required
                ref={passwordConfirmationRef}
                placeholder='Re-enter password'
              />
            </Form.Group>
            <Button
              disabled={loading}
              variant='success'
              className='w-100'
              type='submit'
            >
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account?
        <Link to='/login' className='text-success mx-1'>
          Login
        </Link>
        instead.
      </div>
    </Fragment>
  )
}

export default Signup
