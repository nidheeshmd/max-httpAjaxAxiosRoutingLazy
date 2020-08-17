import React, { Component } from 'react';

import axiosInstance from '../../../axios';

import Post from '../../../components/Post/Post';

import './Posts.css';

class Posts extends Component{

    state = {
        posts: []
    }


    componentDidMount(){
        axiosInstance.get('/posts')
        .then(response => {
            //console.log(response);
            const posts = response.data.slice(0,4);//get only 4 posts
            const updatePosts = posts.map( post => {
                return{
                    ...post,
                    author:'Max'
                }
            });
            this.setState({posts: updatePosts})
        })
        .catch(error => {
            console.log(error);
            //this.setState({error: true})
        });
    }

    postSelectedHandler =(id)=>{
        //this.setState({selectedPostID: id});// selecting post id without routing
        this.props.history.push({ pathname: '/posts/' + id});
    }

    render(){
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (

                    /* GOING TO A POST BY CLICKING IT --- OPTION 1
                <Link key={post.id} to={'/posts/' + post.id} >
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                </Link>
                */

                /* GOING TO A POST BY CLICKING IT --- OPTION 2*/
             
                <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                    );
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
            </div>
        )
    };
}

export default Posts;