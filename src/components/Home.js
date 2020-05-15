import React from 'react'
import Shout from './Shout'
import Profile from './Profile'
import withStyles from '@material-ui/core/styles/withStyles';

import Grid  from '@material-ui/core/Grid';
import FindFollow from './Findfollow'
import ShoutFeed from './ShoutFeed'


const styles = {
    container: { overflow: 'scroll', width:'20vw', height: '50vh', border: 'solid 1px', margin: '130px, 190px, 90px'},

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
                <Grid item sm={8} xs={12} className={classes.container}>
                    {/* {this.state.renderState === true ? renderShouts() : <p>Loading...</p>} */}
                    <ShoutFeed login = {this.props.login} />
                </Grid>

                



                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>

                <Grid item sm={4} xs={12}>
                    <FindFollow/>
                </Grid>

           </Grid>
        )
    }
}

export default withStyles(styles)(Home); 