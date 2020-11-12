import React, { Component } from 'react';
import Post from '../components/Post';
import styled from 'styled-components';
import { getPosts } from '../utils/api';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  background-color: #eee;
`;

class Posts extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    getPosts()
      .then((res) => {
        this.setState({
          posts: res["data"].data,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  renderPosts = () => {
    const { posts } = this.state;
    return posts.map(post => {
      const { nombre, cantidad } = post;

      return (
        <Post
          autor={nombre}
          frase={cantidad}
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

export default Posts;
