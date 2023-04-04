import React, { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client';

const CreatePost = () => {
    const [post, setPost] = useState({title: "", author: "", description: ""})
    
    const onValueChange = (e) => {
        const {name, value} = e.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
        console.log(post)
    }

    const createPost = async(event) => {
        event.preventDefault()
        await supabase
            .from('Posts')
            .insert({title: post.title, author: post.title, description: post.description})
            .select()

        window.location = "/"

    }

    return (
        <div>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title"  value ={post.title} onChange={onValueChange}/><br />
                <br/>

                <label for="author">Author</label><br />
                <input type="text" id="author" name="author" value ={post.author} onChange={onValueChange}/><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description"  value ={post.description} onChange={onValueChange}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={createPost}/>
            </form>
        </div>
    )
}

export default CreatePost