import React from 'react'
import NavBar from './NavBar'
import Findfollow from './Findfollow'
import Shout from './Shout'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Typography  from '@material-ui/core/Typography';
import Grid  from '@material-ui/core/Grid';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import IconButton from '@material-ui/core/IconButton'
import { Delete, Edit } from '@material-ui/icons'
import withStyles from '@material-ui/core/styles/withStyles'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'

const styles = {
    card: {
        // display: 'flex',
        marginTop: 20,
        marginBottom: 20,
        position: 'relative',
        top: 50,
        // marginRight: 20
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    button: {
        // float: 'right',
    }
}



class MyShouts extends React.Component{

    constructor(){
        super()
        this.state = {
            shouts: [],
            comments: [],
            rendered: false,
            comment: {
                commentBody: "", commentId: null
            },
            open: false,
            setOpen: false,
            shout: {shoutBody: "", shoutId: null},
            dialogType: ""
        }
    }

   
   
    deleteShout = (id) => {
        const token = localStorage.getItem('token')
        const deleteObj = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }

        fetch(`http://localhost:3000/shouts/${id}`, deleteObj)
        .then(resp => resp.json())
        .then(data => {this.setState({shouts: data.shouts, comments: data.comments})}
        )

    }

    editShout = (id) => {
        this.setState(prevState => ({setOpen: !prevState.setOpen, open: !prevState.open, dialogType:'shout', shout: {shoutId: id}}))
    }

    handleSubmit = () => {
        const token = localStorage.getItem('token')
        const { shoutId, shoutBody } = this.state.shout
        const {commentId, commentBody} = this.state.comment
        console.log(commentId)
        const shoutObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(this.state.shout)
}

        const commentObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(this.state.comment) }

            // http://localhost:3000/shouts/${id}
            {
            this.state.dialogType === 'shout' ? 
            fetch(`http://localhost:3000/shouts/${shoutId}`, shoutObj)
            .then(resp => resp.json())
            .then(data => this.setState({shouts: data})) : 
            
            fetch(`http://localhost:3000/comments/${commentId}`, commentObj)
            .then(resp => resp.json())
            .then(data => {this.setState({comments: data})})
            }
 
            
            // console.log(data)
        

        this.handleClose()
    }


    handleClose = () => {
        this.setState({setOpen: false, open: false})
    }

    editComment = (id) => {
        this.setState(prevState => ({setOpen: !prevState.setOpen, open: !prevState.open, dialogType: 'comment', comment: {commentId: id}}))
    }

    deleteComment = (id) => {
        const token = localStorage.getItem('token')
        const deleteObj = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }

        fetch(`http://localhost:3000/comments/${id}`, deleteObj)
        .then(resp => resp.json())
        .then(data => {this.setState({comments: data})}
        )

    }


    

    handleForm = (e) => {
        // console.log(e.target.value)
        { 
        this.state.dialogType === 'shout' ? 
        this.setState({ ...this.state, shout: {...this.state.shout, shoutBody: e.target.value}}) : this.setState({ ...this.state, comment: {...this.state.comment, commentBody: e.target.value}})
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
            const reqObj = {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
            }

            fetch('http://localhost:3000/myuser', reqObj)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                this.setState({
                    shouts: data.shouts, comments: data.comments, rendered: true
                    })
                }    
            )
    }

    renderShouts = () => {
        console.log(this.state)
        const { classes } = this.props 
        const { shouts } = this.state           
        dayjs.extend(relativeTime)
        

        return shouts.map( shout => 
        <Card className={classes.card}> 
            <CardContent className={classes.content}> 
                        

                     <Typography variant="h5">
                            {shout.body}
                    </Typography> 

                     <Typography variant="body2" color="textSecondary">
                            {shout.likeCount} likes
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                            {shout.commentCount} comments
                        </Typography>
                    
                        <Typography variant="body2" color="textSecondary">
                             Created {dayjs(shout.created_at).fromNow()}
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                             Last Updated {dayjs(shout.updated_at).fromNow()}
                        </Typography>

                        <IconButton aria-label="like" className={classes.button}>
                            <Delete onClick={() => this.deleteShout(shout.id)} />
                        </IconButton>

                        <IconButton aria-label="like" className={classes.button}>
                            <Edit onClick={() => this.editShout(shout.id)} />
                        </IconButton>
                </CardContent>
        </Card>
        )
    }

    renderComments = () => {
        console.log(this.state)
        const { classes } = this.props 
        const { shouts } = this.state           
        dayjs.extend(relativeTime)

       return this.state.comments.map( comment => 
        <Card className={classes.card}> 
        <CardContent className={classes.content}> 
                    

                 <Typography variant="h5">
                        {comment.body}
                </Typography> 

                    <Typography variant="body2" color="textSecondary">
                         Created {dayjs(comment.created_at).fromNow()}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                         Last Updated {dayjs(comment.updated_at).fromNow()}
                    </Typography>

                    <IconButton aria-label="like" className={classes.button}>
                        <Delete onClick={() => this.deleteComment(comment.id)} />
                    </IconButton>

                    <IconButton aria-label="like" className={classes.button}>
                        <Edit onClick={() => this.editComment(comment.id)} />
                    </IconButton>
            </CardContent>
    </Card>
        )
    }


    render(){
        console.log("MyShouts state", this.state)
        return(
            <Grid container spacing={6}>

               <Grid item sm={8} xs={12}>
                   {this.state.rendered === true ? this.renderShouts() : <p>Loading...</p>}
               </Grid>

               <Grid item sm={4} xs={12}>
               {this.state.rendered === true ? this.renderComments() : <p>Loading...</p>}
               </Grid>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.state.dialogType === 'shout' ?  'Edit Shout' : 'Edit Comment'}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        {this.state.dialogType === 'shout' ?  'Edit your shout here, make sure to save.' : 'Edit your comment here make sure you save'}
                    </DialogContentText>
                            <TextField onChange = {this.handleForm}
                                autoFocus
                                margin="dense"
                                id="name"
                                label={this.state.dialogType === 'shout' ? "Shout Body" : 'Comment Body'}
                                fullWidth
                            />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Save
                    </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        )
    }
}

export default withStyles(styles)(MyShouts); 