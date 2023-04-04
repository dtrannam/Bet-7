import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client';

const EditPost = ({data}) => {
    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", author: "", description: ""});

    useEffect(() => {
        setPost(data.filter(item => item.id == id)[0])
    }, [])

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

    const updatePost = async (event) =>  {
        event.preventDefault();
        const { error } = await supabase
        .from('Posts')
        .update({ title: post.title, author: post.author,  description: post.description})
        .eq('id', id)

        if (error) {
            console.log(error);
        }

        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();
        const { error } = await supabase
        .from('Posts')
        .delete()
        .eq('id', id) 

        if (error) {
            console.log(error);
        }

        window.location = "/";
    }
    return (
        <div>
            <form>
                
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={onValueChange}/><br />
                <br/>

                <label for="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={onValueChange}/><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" name="description" id="description" value={post.description} onChange={onValueChange}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost