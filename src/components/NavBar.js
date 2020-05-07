import React, {Fragment} from 'react'
import Link from 'react-router-dom/Link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import PostShout from './PostShout'
class NavBar extends React.Component{
    render(){
        return(
           <AppBar>
               <Toolbar className="nav-container">
                   <Button color='inherit' component={Link} to='/home'>Home</Button>
                   <Button color='inherit' component={Link}to="/myshouts">myShouts</Button>
                   <Fragment>
                       <PostShout/>
                    </Fragment>
                   <Button color='inherit' component={Link}to="/logout">Logout</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar