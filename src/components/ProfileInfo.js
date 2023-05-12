import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import { auth, db } from "../components/firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function ProfileInfo(){
	
	const defaultData = {"name": "John Doe",
	                     "email": "johndoe@somecompany.com",
						};

	const [data, setData] = useState(defaultData);
	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				let info = {};
				const usersRef = collection(db, "users");
				const q = query(usersRef, where("uid", "==", user.uid));

				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					info = doc.data();
				});
				setData(info);
			}
		});
		}, []);	
	
	return(
		// <Grid container spacing={10}>
		// 	<Grid item xs={5}>
					<Typography variant="p" component="p">
						<center><font size="20"><b>{data.name}</b></font></center>
						<br/><br />
						<center>{data.email}</center>
						<br/><br />
						<center><em>The meaning of life is not simply to exist, to survive, but to move ahead, to go up, to conquer.</em> <br/>– Arnold Schwarzenegger, 7-time Mr Olympia</center>
					</Typography>
		// 	 {/* </Grid>
		// </Grid>  */}
	);
}

export default ProfileInfo;