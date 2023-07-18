import  { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import  genres  from '../services/genre.service';
const MyForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    first_name: '',
    last_name: '',
    user_profile:{
        genre_preferences: [],
        profile_picture: '',
    }
  });
  const [genre, setGenres] = useState([]);
useEffect(()=>{ const getGenre=async()=>  {
    const response = await genres.fetchAll();
    setGenres(response)}
    getGenre();
},[])
  const handleGenreChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    value.toString();
    setFormData((prevData) => ({
      ...prevData,
      user_profile: {
        ...prevData.user_profile,
        genre_preferences: [...prevData.user_profile.genre_preferences, value],
      },
    }));
  };
  const handleProfileChange =(event)=>{
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      user_profile: {
        ...prevData.user_profile,
        [name]: value,
      },
    }));
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const formJson = JSON.stringify(formData);
   try{
    const response = await axios.post('/register/', formJson)
    console.log(response)
    } catch (error) { 
        console.log(error)
        }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <TextField
        label="Confirm Password"
        type="password"
        name="password2"
        value={formData.password2}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <InputLabel>Genre Preference 2</InputLabel>
        <Select
          name="genre_preferences[1]"
          defaultValue={47}
          onChange={handleGenreChange}
        >
            {genre && genre.map(g=>(
                <MenuItem value={g.id} key={g.id}>{g.name}</MenuItem>))} 
        </Select>
      <TextField
        label="Profile Picture URI"
        name="profile_picture"
        value={formData.user_profile.profile_picture}
        onChange={handleProfileChange}
      />
      <Button variant="contained" type="submit">Submit</Button>
    </form>
  );
};

export default MyForm;
