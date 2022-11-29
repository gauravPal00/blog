import React, { useState, useEffect, useContext } from 'react'
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';
import { API } from '../service/api';


const Container = styled(Box)`
margin:50px 100px    
`

const Image = styled("img")({
    width: "100%",
    height: "50vh",
    objectFit: "cover"
})
const StyledFromControl = styled(FormControl)`
margin-top:10px;
display:flex;
flex-direction:row
`
const InputTextField = styled(InputBase)`
flex:1;
margin:0 30px;
font-size:25px
`
const Textarea = styled(TextareaAutosize)`
width:100%;
margin-top:50px;
font-size:18px;
border:none;
&:focus-visible{
    outline:none;
}
`

const initalPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date()
}

export const CreatePost = () => {
    const [post, setPost] = useState(initalPost)
    const Url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    const location = useLocation()
    const { account } = useContext(DataContext)

    const handleChange = (e) => {
        setPost({ ...post, [e.tagret.name]: e.tagret.value })
    }

    const [file, setFile] = useState('')

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData()
                data.append("name", file.name)
                data.append("file", file)
                // API Call
                let response = await API.uploadFile(data)
                post.picture = response.data
            }
        }
        getImage()
        post.categories = location.search?.split("=")[1] || "All";
        post.username = account.username
    }, [file, post, location, account.username])

    return (
        <Container >
            <Image src={Url} alt="banner" />
            <StyledFromControl>
                <label htmlFor="fileInput">
                    <AddCircleIcon fontSize='large' color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField placeholder='Title' onChange={(e) => handleChange(e)} name="title" />
                <Button variant="contained">Publish</Button>
            </StyledFromControl>

            <Textarea
                minRows={5}
                placeholder="Tell your story...."
                name="description"
                onChange={(e) => handleChange(e)}
            />
        </Container>
    )
}
