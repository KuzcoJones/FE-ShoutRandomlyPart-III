import React from 'react'
import { Link } from 'react-router-dom'

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import {Typography} from '@material-ui/core'
//Icons
    

const styles = theme => ({
    paper: {padding: 20},
    profile: {
        '& .image-wrapper': {
            textAlign: 'center', 
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image':{
            width: 200,
            height: 200,
            objectFit: 'center',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                versionAlign: 'middle'
            },
            '& a':{
                color: theme.palette.primary.main
            }
        }, 
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover':{
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px, 10px'
        }
    }
})

class Profile extends React.Component{
    constructor(){
        super()
        this.state = {
           renderState:false,
           userInfo: {

           }
        }
    }

    componentDidMount(){
        //    
        if(localStorage.getItem !== null){
            const token = localStorage.getItem('token')
            const reqObj = {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
            }
            fetch('http://localhost:3000/current_user', reqObj)
            .then(resp => resp.json())
            .then(data => 
                 
                   { this.setState({
                       userInfo: data, renderState: 'done'
                         })
                    }
                )
                
              }
    }

  
    

    renderUserInfo = () => {
        console.log('profile state', this.state)
        const { classes } = this.props
        return <Paper className={classes.paper}>
            <div className= {classes.profile}>
                <div className='image-wrapper'>
                    <img className='profile-image' src={this.state.userInfo.imgUrl} alt=""/>
                </div>

                <div className= "profile-details">
                    <MuiLink component={Link} to='/myShouts' color='primary' variant='h5' >@{this.state.userInfo.username}</MuiLink> <hr/>
                    {this.state.userInfo.bio && <Typography variant='body2'> {this.state.userInfo.bio} </Typography>} <hr/>
                </div>

                {/* <h3>{this.state.userInfo.bio}</h3>
                <h3>{this.state.userInfo.username}</h3> */}
            </div>
        </Paper>
    }

    renderEditForm = () => {

    }

    loadingMessage = () => {
        return <h3>...Loading</h3>
    }

    render(){
        console.log(this.state)
        
    
        return(
            <div>
                {this.state.renderState === 'done' ? this.renderUserInfo() : this.loadingMessage()}
            </div>
        )
    }
}

export default (withStyles(styles)(Profile))