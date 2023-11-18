import { Fragment, useRef, useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ForgotPassword = () => {
  const emailRef = useRef("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError("")
      setMessage("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <Card className='p-2'>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          {error && (
            <Alert variant='danger' className='mb-4' dismissible>
              {error}
            </Alert>
          )}
          {message && (
            <Alert variant='success' className='mb-4' dismissible>
              {message}
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

            <Button
              disabled={loading}
              variant='success'
              className='w-100'
              type='submit'
            >
              Reset Password
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to={"/login"} className='link-info'>
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
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

export default ForgotPassword
