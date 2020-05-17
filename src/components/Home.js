import React from 'react'
import Shout from './Shout'
import Profile from './Profile'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography'

import Grid  from '@material-ui/core/Grid';
import FindFollow from './Findfollow'
import ShoutFeed from './ShoutFeed'


const styles = {
    container: { 
         width:'100vw', height: '50vh', margin: '130px, 190px, 90px',
        position: 'relative',
        top: '20vh'



    },
    title: {
        position: 'relative',
        bottom: '10vh',
        left: '30vw'
    }

}


class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            shouts: null,
            renderState: false
        }
    }



    
    render(){
      const { classes } = this.props

       

        return(
           <Grid container spacing={16}>
               {/* <Typography variant='h3' className={classes.title}>
                    ShoutFeed
               </Typography> */}

                <Grid item sm={8} xs={12} className={classes.container}>
                    <ShoutFeed login = {this.props.login} />
                </Grid>

                



                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid> 

                <Grid item sm={4} xs={12} container >
                    <FindFollow/>
                </Grid>

           </Grid>
        )
    }
}

export default withStyles(styles)(Home); 