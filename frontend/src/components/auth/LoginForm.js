import React from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'

const LoginForm = () => {
  return (
    <div className='landing'>
        <div className='dark-overlay'>
            <div className='landing-inner'>
                <h1>Process Tracker</h1>
                <h4>Keep Track Of Your Working</h4>
                <Form className='my-4'>
                  <Form.Group>
                    <Form.Control type='text' placeholder='Username' name='username' required>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                  <Form.Control type='text' placeholder='Password' name='password' required>
                    </Form.Control>
                  </Form.Group>

                  <Button variant='sucess' type='submit' className='ml-2 btn-primary'>Login</Button>
                </Form>

                <p>Dont have an account? 
                  <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>Register</Button>
                  </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default LoginForm