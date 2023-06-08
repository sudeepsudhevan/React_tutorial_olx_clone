import React,{useEffect,useState,useContext} from 'react';
import { PostContext } from '../../store/postContext';
import { db } from '../../firebase/config';
import { collection, getDocs, where } from 'firebase/firestore';

import './View.css';
import { query } from 'firebase/firestore';
function View() {
  const [userDetails,setUserDetails] = useState();
  const {postDetails} = useContext(PostContext);
  useEffect(()=>{
    const {userId} = postDetails;
  const q = query(collection(db, 'users'), where('id', '==', userId));
  getDocs(q).then((snapshot) => {
    snapshot.forEach((doc) => {
      setUserDetails(doc.data());
    });
  });
  },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
