import { Fragment, useRef, useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const UpdateProfile = () => {
  const nameRef = useRef("")
  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { updateProfileData } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await updateProfileData(nameRef.current.value)
      navigate("/dashboard")
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
          <h2 className='text-center mb-4'>Profile Update</h2>
          {error && (
            <Alert variant='danger' className='mb-4' dismissible>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' id='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                required
                ref={nameRef}
                placeholder='Update you profile name'
              />
            </Form.Group>

            <Button
              disabled={loading}
              variant='success'
              className='w-100'
              type='submit'
            >
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default UpdateProfile
