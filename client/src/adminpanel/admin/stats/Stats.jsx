import { useState, useEffect } from 'react'
import styles from "./users.module.css"
import { StatCard } from "../../../components/export"
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';


const Stats = () => {

    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [numOfPages, setNumOfPages] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fetchPosts = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('/api/admin/get_users', {
                params: {
                    page: page,
                    limit: 10,
                    search,
                },
            });
            setIsLoading(false)
            setUsers(response.data.users);
            setNumOfPages(response.data.numofPages)
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [search, page, numOfPages]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box className={styles.container}>

            <div className={styles.inputContainer} >
                <TextField
                    fullWidth
                    label="Search"
                    id="outlined-size-small"
                    defaultValue={search}
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>



            <div className={styles.cards}>
                {users.map((item) => (
                    <Link to={`/admin/user/${item._id}`} key={item._id}><StatCard item={item} /></Link>
                ))}
            </div>


            {numOfPages > 1 &&
                <div className={styles.page}>
                    <Pagination size="large" page={page} count={Number(numOfPages)} onChange={handleChange} color="secondary" />
                </div>
            }
        </Box>
    )
}

export default Stats