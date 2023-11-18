import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import Header from "./Header"

const AppLayout = () => {
  return (
    <Container
      className='d-flex justify-content-center'
      style={{ minHeight: "100vh" }}
    >
      <div className='w-100' style={{ maxWidth: "500px" }}>
        <Header />
        <Outlet />
      </div>
    </Container>
  )
}

export default AppLayout
