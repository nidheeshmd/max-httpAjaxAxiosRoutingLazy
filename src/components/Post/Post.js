import React from 'react';
import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => (
    <article className="Post" 
    onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

export default withRouter(post);
/*routing props not passing to full component tree. So we use withRouter. chapter 11 part 12*/