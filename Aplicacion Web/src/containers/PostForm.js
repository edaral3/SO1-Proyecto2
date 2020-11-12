import React, { Component } from 'react';
import Post2 from '../components/Post2';
import styled from 'styled-components';
import { getPosts2 } from '../utils/api';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  background-color: #eee;
`;

class PostForm extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      loading: true,
    }
  }

  componentDidMount() {
    getPosts2()
      .then((res) => {
        this.setState({
          posts: [JSON.parse(res["data"].data)],
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  
  renderPosts = () => {
    const { posts } = this.state;
    return posts.map(post => {
      const { name, location, age, infectedtype, state } = post;

      return (
        <Post2
          autor={name}
          frase={location}
          age = {age}
          type = {infectedtype}
          state = {state}
        />
      );
    });
  }
  

  render() {
    const { loading } = this.state;

    return (
      <Container>
        {loading ? 'loading...' : this.renderPosts()}
      </Container>
    );
  }
}

export default PostForm;
