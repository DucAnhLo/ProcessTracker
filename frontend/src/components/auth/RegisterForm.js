import React from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'

const RegisterForm = () => {
  return (
    <div className='landing'>
        <div className='dark-overlay'>
            <div className='landing-inner'>
                <h1>Process Tracker</h1>
                <h4>Keep Track Of Your Working</h4>
                <Form className='my-4'>
                  <Form.Group className='mt-2'>
                    <Form.Control type='text' placeholder='Username' name='username' required>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className='mt-2'>
                  <Form.Control type='text' placeholder='Password' name='password' required>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className='mt-2'>
                  <Form.Control type='text' placeholder='Confirm password' name='password' required>
                    </Form.Control>
                  </Form.Group>

                  <Button variant='sucess' type='submit' className='ml-2 mt-2 btn-primary'>Register</Button>
                </Form>

                <p>Already have an account? 
                  <Link to='/Login'>
                    <Button variant='info' size='sm' className='mr-2'>Login</Button>
                  </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default RegisterForm