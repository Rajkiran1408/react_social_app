import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { Routes,Route, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { format} from "date-fns";
import api from "./api/posts";
import Editpost from "./Editpost";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";


function App() {
  const [posts, setPosts] = useState([]);
  // console.log(posts[1].title)
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([]);
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('')
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");
  const navigate=useNavigate()
  const {width}=useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  );

  useEffect(()=>{
    setPosts(data);
  },[data]);


  // useEffect(()=>{
  //   const fetchdata=async ()=>{
  //     try{
  //       const response=await api.get('/posts')
  //       setPosts(response.data)
  //     }
  //     catch(err){
  //       if(err.response){
  //         console.log(err.response.data)
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       }
  //       else{
  //         console.log(`Error:${err.message}`);
  //       }
  //     }
  //   }
  //   fetchdata();
  // },[])

  useEffect(()=>{
    const filesresults=posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filesresults.reverse());
    
  },[posts,search])
  

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const id1=posts.length?Number(posts[posts.length-1].id)+1 :1;
    const id=id1.toString()
    const detetime=format(new Date(), 'MMM dd , yyyy pp');
    const newPost={id,title:postTitle,detetime,body:postBody};
    const response=await api.post('/posts',newPost);
    const allPosts=[...posts,response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate("/");
    
  }
  const handleDelete=async (id)=>{
    try{
      await api.delete(`/posts/${id}`);
      const afterDeletePost=posts.filter(post=>post.id !== id)
      setPosts(afterDeletePost);
      navigate('/')
    }
    catch(err){
      console.log(err.message);
    }
    
  }

  const handleEdit=async(id)=>{
    const detetime = format(new Date(), "MMM dd , yyyy pp");
    const updatePost = { id, title: updateTitle, detetime, body: updateBody };
    try {
      const response=await api.put(`/posts/${id}`,updatePost);
       setPosts(posts.map(post=>(post.id===id)?{...response.data}:post));
       setUpdateTitle("");
       setUpdateBody("");
       navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className="App">
      <Header title="Rajkiran Social Media" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} fetchError={fetchError} isLoading={isLoading}  />} />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                postBody={postBody}
                setPostTitle={setPostTitle}
                setPostBody={setPostBody}
              />
            }
          />

          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route
          path="/edit/:id"
          element={
            <Editpost
              posts={posts}
              handleEdit={handleEdit}
              updateBody={updateBody}
              setUpdateBody={setUpdateBody}
              updateTitle={updateTitle}
              setUpdateTitle={setUpdateTitle}
            />
          }
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
