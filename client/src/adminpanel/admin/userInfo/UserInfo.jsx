import { useState, useEffect } from 'react'
import styles from "./index.module.css"
import axios from 'axios';
import {
    useParams
} from "react-router-dom";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Item } from "../../../components/export"

const UserInfo = () => {

    const [user, setUser] = useState([]);
    const [saved, setSaved] = useState([]);
    const [purchased, setPurchased] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let { id } = useParams();
    const fetchuser = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/api/admin/get_user/${id}`);
            setIsLoading(false)
            setUser(response.data.user);
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    };

    const fetchusersaved_purchased_Items = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/api/admin/get_user_saved_purchased_items/${id}`);
            setIsLoading(false)
            setSaved(response.data.savedItems);
            setPurchased(response.data.purchasedItems);
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    }

    useEffect(() => {
        fetchuser();
        fetchusersaved_purchased_Items()
    }, []);


    const { name, email, userImg, method } = user
    return (
        <div className={styles.container} >
            <div className={styles.userContainer} >
                <div className={styles.imgContainer} >
                    <img className={styles.userImg} src={userImg} alt={name} />
                </div>
                <div className={styles.textInfo} >

                    <div className={styles.textContainer}>Name <span>{name}</span></div>
                    <div className={styles.textContainer}>Email <span>{email}</span></div>
                    <div className={styles.textContainer}>SignIn method <span>{method}</span></div>
                </div>

            </div>


            <div className={styles.tabContainer} >
                <TabContext value={value} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="Saved Item" value="1" />
                            <Tab label="Purchased Item" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {saved.length !== 0 ? (saved.map((item) => <Item key={item._id} item={item} />)) : <h1>No Saved Items</h1>}
                    </TabPanel>
                    <TabPanel value="2">
                        {purchased && purchased.length !== 0 ? (saved.map((item) => <Item key={item._id} item={item} />)) : <h1>No purchased Items</h1>}
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    )
}

export default UserInfo