import { Fragment } from "react"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Header = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <Navbar expand='lg' className='bg-body-secondary mt-3 mb-5 py-3'>
      <Container>
        <Navbar.Brand>
          <Link to={"/"} className='link-dark link-underline-opacity-0'>
            Firebase Auth Demo
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            {currentUser ? (
              <Fragment>
                <Link to={"/dashboard"} className='link-dark me-3 my-auto'>
                  Dashboard
                </Link>
                <Button variant='outline-success' onClick={handleLogout}>
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Link to={"login"} className='link-success me-3'>
                  Login
                </Link>
                <Link to={"signup"} className='link-success'>
                  Register
                </Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
