// Native modules import
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserPosts extends Component {
  render() {
    const { posts } = this.props;
    // console.log('posts inside ProfileTabes', posts);
    return (
      <div>
        <div className="col-md-12">
          <h3 className="text-primary">{posts.length} Posts</h3>
          <hr />
          {posts.map((post, i) => (
            <div key={i}>
              <div>
                <Link to={`/post/${post._id}`}>
                  <div>
                    <p className="lead" style={{color: "#81A65D"}}>{post.title}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default UserPosts;
