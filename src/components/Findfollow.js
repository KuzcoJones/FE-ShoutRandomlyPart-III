import React from 'react'
import Grid from '@material-ui/core/Grid'


import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Add from '@material-ui/icons/AddCircle'

// Send Updated List of Followers to Shoutfeed. 
// Change data from fetch relationship create to include user.followed_shouts.

const styles = theme => ({
    card: {height: '20vh'},
    title: {
        border: '1px solid',
        height: '5vh',
        width: '100%',
       backgroundColor: '#b71c1c',
    },
    user:{border: 'solid 4px', margin: '10', padding: '10'},
    container: {overflow: 'scroll', height: '35vh', border: 'solid 1px', position: 'relative', left: '200%'},
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
            width: 50,
            height: 50,
            objectFit: 'center',
            maxWidth: '100%',
            // borderRadius: '80%'
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

class Findfollow extends React.Component{
    constructor(){
        super()
        this.state = {
            non_followers: [],
            rendered: false
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
                non_followers: data, 
                rendered: true
            })
        })
    }

    renderUsers = () => {
        const { classes } = this.props

        return this.state.non_followers.map( user => 

            <Grid item container direction='row' xs='10' className={classes.user} >  
                <Grid item className={classes.profile} xs='8' >   
                    <div className='image-wrapper'>
                        <img className='profile-image' src={user.imgUrl} alt=""/>
                    </div>
                    <Typography variant="body1" className='profile-details'>
                            @{user.username}
                    </Typography> 

                    <Typography variant="body2">
                            {user.bio}
                    </Typography> 


                </Grid>
                <Tooltip title='Follow User' placement="top">
                    <IconButton onClick={() => this.followUser(user.id)}>
                        <Add/>
                    </IconButton>
                </Tooltip>
            </Grid>
            
            )
    }

    followUser = (userId) => {
        const token = localStorage.getItem('token')
        const postObj = {
            method: "POST",
            headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({followed: userId})
        }
        fetch('http://localhost:3000/relationships', postObj)
        .then(resp => resp.json() )
        .then( data => { 
                this.setState({
                    ...this.state, non_followers: data
                })

        })
    }

    render(){
        const { classes } = this.props

        console.log("FindFollow state", this.state)
        return(
            <div>
                <Grid container direction='row' justify="space-evenly" className={classes.container} maxWidth="xs" xs='8' spacing={16} height="200px">
                        {this.state.rendered === true ? this.renderUsers(): <p>...Loading</p>}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Findfollow)