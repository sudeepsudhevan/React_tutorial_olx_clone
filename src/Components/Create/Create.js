import React, { Fragment, useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/Context';
import { storage, db } from '../../firebase/config';
import { getDownloadURL,uploadBytes,ref } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
 
const Create = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date()
  const handleSubmit = () => {
    const upload = ref(storage, `images/${image.name}`)
    uploadBytes(upload, image)
      .then((snapshot) => {
        console.log("Uploaded image!");
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          addDoc(collection(db, "products"), {
            name: name,
            category: category,
            price: price,
            url: downloadURL,
            userId: user.uid,
            createdAt: date.toDateString()
          }).then(() => {
            console.log("data successfully uploaded!");
            navigate('/')
          }
          ).catch((error) => {
            console.error("Error writing document: ", error);
          }
          );
        });
      });  
      
  }         
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }
            
            } type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
