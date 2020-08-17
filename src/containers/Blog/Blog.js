import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

/*Link and NavLink have same functionalities. But using NavLink , able to add style for active link.
for example change the color of selected menu or navigation. It dynamically add a active class to the component

If we wrap with Switch component to all Route, at a time only one route will show.*/

import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost'; COMMENTED TO IMPLEMENT LAZY LOADING.
import FullPost from './FullPost/FullPost';
import pageNotFound from '../../components/PageNotFound/PageNotFound';


import './Blog.css';

//LAZY LOADING
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    return import ('./NewPost/NewPost');
});

//LAZY LOADING FROM REACT 16.6
//const AsyncNewPost = React.lazy(()=> import('./NewPost/NewPost'));


class Blog extends Component {

    state = {
        auth: true
    }

    render () {


        
        return (
            <div className="Blogs">
                <header>
                    <nav>
                        <ul>
                            <li>
                            <NavLink to='/' 
                            exact
                            //activeClassName='custom-className' add a custom class name to the active link
                            >Home</NavLink></li>
                            <li><NavLink to={{
                                //pathname: this.props.match.url + '/new-post', relative path. add '/new-post' to base or common url.
                                pathname: '/new-post', //absolute path. append the '/new-post' to the end of current url
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/*<Route path='/' exact={true} component={Posts}/> this also possible*/}
                <Route path='/' exact={true} component={Posts}/>
                <Switch>

                   {this.state.auth 
                   ? <Route path='/new-post' component={AsyncNewPost}/> 
                          
                   : <Redirect from='/new-post' to='/'/>} {/* implimentation of guards */}
                    <Route path='/posts/:postid' exact component={FullPost}/>
{/*FOR LAZY LOADING FROM REACT 16.6 (wrap <React.Fragment></React.Fragment> in parent component eg: app.js)

<Route path='/new-post' render={()=> <Suspense fallback={<div>Loading...</div>}>
    <AsyncNewPost></AsyncNewPost>
    </Suspense>}/> 


    <Suspense></Suspense> MUST BE IMPORTED FROM REACT
*/}



                    {/*changed the order of routes because of nexted route item did not show issue chapter 11, part22
                    
                    after : we put a dynamic variable that we able to assign values and pass them through url
                    for eg: here the id of post etc.
                    
                    the order of routes must consider if we use <Switch>. otherwise the first matching route
                    will only work. not other but similar starting charector or id routes will not be work*/}

                    {/*<Redirect from='/' to='/new-post'/>*/}
                    <Route component={pageNotFound}/>

                    {/*Routr without a path is used to load a 404 page*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;