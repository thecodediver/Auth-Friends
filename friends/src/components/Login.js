import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLogin = styled.div`
  header {
    height: 10vh;
    background-color: #333;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 30%;
      list-style-type: none;
      li a {
        color: white;
        font-weight: bold;
        font-size: 1.5rem;
      }
    }
  }
  .login-form-container {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    form {
      display: flex;
      flex-direction: column;
      padding: 4%;
      background-color: #333;
      box-shadow: 3px 3px 5px black;
      input, button {
        margin: 3% 0;
        text-align: center;
        font-size: 1.3rem;
        cursor: pointer;
      }
    }
  }
`

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  login = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/login', this.state.credentials)
    .then(res => {
      window.localStorage.setItem('token', res.data.payload)
      this.props.history.push('/protected')
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <StyledLogin>
        <div>
          <header>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
          </header>
        </div>
        <div className="login-form-container">
          <form onSubmit={this.login}>
            <input type="text" name="username" placeholder="Username" value={this.state.credentials.username} onChange={this.handleChange} />
            <input type="password" name="password" placeholder="Password" value={this.state.credentials.password} onChange={this.handleChange} />
            <button>Log In</button>
          </form>
        </div>
      </StyledLogin>
    )
  }
}
export default Login