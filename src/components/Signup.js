import React from 'react'

class Signup extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    handleInputChange = (event) => {
        this.setState({
            ...this.state, [event.target.name]: event.target.value
        })
        console.log(this.state)
    }

    handleForm = (event) => {
        event.preventDefault()
        const signupObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }
        fetch('http://localhost:3000/signup', signupObj)
        .then( resp => resp.json())
        .then(data => 
            {if(data.error){alert(data.error)}
                else{
                    localStorage.setItem('token', data.token)
                    this.props.history.push('/home')
                }
            }
        )
    }


    render(){
        return(
            <div>
                <h1>Signup</h1>
                <div className='form-container'>
                    <form onSubmit={(event) => {this.handleForm(event)} } action="" method="post">
               

                        <label htmlFor="first_name">First name</label>
                        <input onChange={(event) => {this.handleInputChange(event)}}type="text" name="first_name" id="" placeholder="John"/>

                        <br/>
                        

                        <label htmlFor="last_name">Last name</label>
                        <input onChange={(event) => {this.handleInputChange(event)}}type="text" name="last_name" id="" placeholder="Smith"/>

                        <br/>
                        
                        <label htmlFor="username">Username </label>
                        <input onChange={(event) => {this.handleInputChange(event)}} 
                        type="text" name="username" id=""/>

                                <br/>

                        <label htmlFor="password">Password </label>
                        <input onChange={(event) => {this.handleInputChange(event)}}type="password" name="password" id=""/>

                                <br/>

                        <label htmlFor="bio">Biography </label>
                        <textarea onChange= {(event) => this.handleInputChange(event)} name="bio" id="" cols="30" rows="10" maxLength='250'></textarea> <br/>
                        <input type="submit" value="Signup"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Signup