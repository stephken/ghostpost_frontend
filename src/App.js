import React from 'react';
import logo from './logo.svg';
import './App.css';
//got help from Chris Warren for form
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [], 

    };
  }
    handleContent = (event) => {
      this.setState({content: event.target.value})
    };
    handlePost = (event) => {
      this.setState({post_type: event.target.value})
    };
    handleSubmit = (event) => {
      const requestBody = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state),
      };
      fetch("http://localhost:8000/api/posts/", requestBody)
        .then((res) => res.json())
        .then();
      console.log(this.state);
      alert("Flag on The Play");
    };
    

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/posts/")
    .then(res => res.json())
    .then(data => this.setState({posts:data}))
  }

  increase =(postId) =>{

    fetch("http://localhost:8000/api/posts/"+postId+"/up_vote/")
    .then(res => res.json())
    .then(data => console.log(data))
  }
  decrease =(postId) =>{
    fetch("http://localhost:8000/api/posts/"+postId+"/down_vote/")
    .then(res => res.json())
    .then(data => console.log(data))
  }
  boasts =() => {
    fetch("http://127.0.0.1:8000/api/posts/Boast/")
    .then(res => res.json())
    .then(data => this.setState({posts:data}))
  }
  roasts =() => {
    fetch("http://127.0.0.1:8000/api/posts/Roast/")
    .then(res => res.json())
    .then(data => this.setState({posts:data}))
  }


  render() {
    return (
      <div>
        
        <form onSubmit={this.handleSubmit}>
          <p></p>
          <select onChange={this.handlePost}>
            <option name="post_type" value="Boast">
              Boast
              {console.log(this.state)}
            </option>
            <option name="post_type" value="Roast">
              Roast
              {console.log(this.state)}
            </option>
          </select>
          <p></p>
          <textarea
            onChange={this.handleContent}
            rows="7"
            cols="40"
            placeholder="Enter your text..."
            name="content"
            value={this.state.content}
          ></textarea>
          <p></p>
          <button type="submit">Submit!</button>
       </form>
        <button onClick= {() => this.boasts()}>All Boasts</button>
        <button onClick= {() => this.roasts()}>All Roasts</button>
        {this.state.posts.map((post) => (
          <ul>
          <li>{post.post_type === true ? "boast" : "roast"}</li>
          <li>{post.up_votes} <button onClick= {() =>this.increase(post.id)}>"up vote"</button></li>
          <li>{post.down_votes} <button onClick= {() =>this.decrease(post.id)}>"down vote"</button></li>
          <li>{post.post_date}</li>
          <li>{post.content}</li>
          <li>{post.vote_counter}</li>
          <li>{post.id}</li>
        </ul>
          
        ))}


      </div>  

        
      
      
    );


  }

  
}

export default App;
