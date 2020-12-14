import React from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledFriends = styled.div`
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
      li a, li button {
        color: white;
        font-weight: bold;
        font-size: 1.5rem;
        background-color: unset;
        border: unset;
        text-shadow: 3px 3px 5px black;
        transition: all .2s;
        cursor: pointer;
        &:hover {
          color: #999;
          text-shadow: 1px 1px 3px black;
        }
      }
    }
  }
  .friends-info {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    h1 {
      text-decoration: underline;
    }
    .bold {
      font-weight: bold;
    }
  }
`

class Friends extends React.Component {
  state = {
    friends: []
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axiosWithAuth()
    .get('/friends')
    .then((res) => {
      this.setState({
        friends: res.data
      })
    })
    .catch(err => console.log(err))
  }

  logout = () => {
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  render() {
    return (
      <StyledFriends>
        <div>
        <header>
            <ul>
              <li>
                <button onClick={this.logout}>Logout</button>
              </li>
              <li>
                <Link to="/protected">Protected</Link>
              </li>
            </ul>
          </header>
        </div>
        <div className="friends-info">
          <div>
            <h1>Friends</h1>
            {this.state.friends.map(friend => <p key={friend.email}><span className="bold">Name:</span> {friend.name} <span className="bold">Age:</span> {friend.age} <span className="bold">Email:</span> {friend.email}</p>)}
          </div>
        </div>
      </StyledFriends>
    )
  }
}

export default Friends