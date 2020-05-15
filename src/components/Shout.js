import React,  {Fragment} from 'react'
import PostComment from './PostComment'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import { ThumbUp, ThumbDown, Comment } from '@material-ui/icons'

import Typography  from '@material-ui/core/Typography';
import Grid  from '@material-ui/core/Grid';


const styles = {
    container: {
        minWidth: 500
    },
    cardContainer: {
        minWidth:500
    },
    card: {
        display: 'flex',
        height: '20vh' ,
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 35,
        minWidth: 300

    },
    image: {
        minWidth: 100,
        width: 100
    },
    content: {
        padding: 40,
        position: 'relative',
        left: '5vw',
        objectFit: 'cover'
    },
    button: {
        position: 'relative',

    },
    buttonBar: {
        position: 'relative',
        bottom: '6vh',
        right: '4vw'
    },
    shoutInfo: {
        position: 'relative',
        left: '5vw',
        bottom: '5vh'
    },
    userInfo: {
        position: 'relative',
        right: '10vw'
    }

}

class Shout extends React.Component{

    constructor(){
        super()
        this.state = {
            rendered: false,
            shout: {},
            liked: true ,
            disliked: false,
            commented: false
        }
    }

    componentDidMount(){
        this.setState({
            shout: this.props.shout, rendered: true
        })
    }

    likeShout = (shoutId) => {
        const token = localStorage.getItem('token')
        const postObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({shoutId: shoutId})
        }
        fetch(`http://localhost:3000/likes`, postObj)
        .then(resp => resp.json())
        .then(data => 
            // console.log(data)
             {this.setState({
            shout:data
             })}
        )
        .catch(error => {
            throw(error);
        })
    }

    
    dislikeShout = (shoutId) => {
        
        const token = localStorage.getItem('token')
        const deleteObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({shoutId: shoutId})
        }
        fetch(`http://localhost:3000/unlike`, deleteObj)
        .then(resp => resp.json())
        
        .then(data => 
            { this.setState({shout:data})}
        )
        .catch(error => {
            throw(error);
        })

    }


    loadingMessage = () => {
        return <h3>...Loading</h3>
    }

   

    renderShout = () => {
        dayjs.extend(relativeTime)
        const { classes } = this.props 
        const { shout } = this.state
        
        const { id } = this.state.shout 

        return (
            <div className = {classes.cardContainer}>
                <Card className={classes.card}>
                    <CardMedia className = {classes.image}
                    image={shout.user.imgUrl} title='Profile Image'/>

                    <CardContent className={classes.content}>
                        <Typography variant="subtitle1">
                            {shout.body}
                        </Typography>

                    <div className={classes.userInfo}>
                        <Typography variant="body2" color="textSecondary">
                             {dayjs(shout.created_at).fromNow()}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            @{shout.user.username}
                        </Typography>
                    </div>

                        <div className={classes.shoutInfo}>
                            <Typography variant="body2" color="textSecondary">
                                {shout.likeCount} likes
                            </Typography>

                            <Typography variant="body2" color="textSecondary">
                                {shout.commentCount} comments
                            </Typography>
                        </div>

                       
                    <Grid className = {classes.buttonBar}>
                        <IconButton className={classes.button} aria-label="like">
                            <ThumbUp onClick={() => this.likeShout(id)} />
                        </IconButton>

                        <IconButton aria-label="dislike">
                            <ThumbDown  onClick={() => this.dislikeShout(id)} />
                        </IconButton>
                    
                    
                        <Fragment>
                            <PostComment shoutId={shout.id}/>
                        </Fragment>
                    </Grid>

                        
                    
                    </CardContent>
                </Card>  
            </div>
        )
    }

    render(){
        const { classes } = this.props
        return(
            <div className={classes.container}>
                {/* this.state.renderState === 'done' ? this.renderUserInfo() : this.loadingMessage() */}
                {this.state.rendered === true ? this.renderShout() : this.loadingMessage()}
            </div>
        )
    }
}

export default withStyles(styles)(Shout); 