import React from 'react'

class Findfollow extends React.Component{
    constructor(){
        super()
        this.state = {
            non_followers: [],
            filtered: []
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
        const reqObj = {method: 'GET',
    headers: {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    }}
        fetch('http://localhost:3000/users', reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                non_followers: data
            })
        })
    }

    render(){
        console.log(this.state)
        return(
            <div>Find Follow</div>
        )
    }
}

export default Findfollow