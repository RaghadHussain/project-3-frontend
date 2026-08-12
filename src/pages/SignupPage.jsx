import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../services/authService";
import getImageUrl from '../utils/imageUrl'
import "./Pages.css";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
    profileImage: '',
    bio: ''
  });
  const [ submitting, setSubmitting ] = useState(false)

  const { username, password, passwordConf , bio} = formData;

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  function handleChange(event){
    setError("");
    setFormData({ ...formData, [event.target.name]: event.target.value });

  }

  function handleImageChange(event) {
        setFormData({ ...formData, profileImage: event.target.files[0] })
    }


  async function handleSubmit(event){
    event.preventDefault();
    try {
      setSubmitting(true)
      await signUp(formData);
      navigate('/sign-in')
    } catch (err) {
      setError(err.response.data.message);
      setSubmitting(false)
    }
  }

  function isFormInvalid(){
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="signup-page">
      <h1>Sign Up</h1>
      <p className="error">{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
          />
        </div>
        <div>
           <label htmlFor="profileImage">Change Profile Image: </label>
            <input id="profileImage" name="profileImage" type="file" accept="image/*" onChange={handleImageChange} />

          <label htmlFor="bio">Bio: </label>
          <input
            type="text"
            id="bio"
            value={bio}
            name="bio"
            onChange={handleChange}
          />
        </div>
        <div>
          <button disabled={isFormInvalid() || submitting}>{submitting ? 'Signing up...' : 'Sign Up'}</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </main>
  );
}
export default Signup;
