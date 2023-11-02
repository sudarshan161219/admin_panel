import { useState, useEffect } from 'react'
import styles from "./blog.module.css"
import { BlogCard } from "../../../components/export"
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const Blog = () => {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [category, setCategory] = useState('');
    const [numOfPages, setNumOfPages] = useState('')
    const [tag, setTag] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const fetchPosts = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('/api/admin/getPosts', {
                params: {
                    page: page,
                    limit: 10,
                    search,
                    sortBy,
                    category,
                    tag,
                },
            });
            setIsLoading(false)
            setPosts(response.data.post);
            setNumOfPages(response.data.numofPages)
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [search, sortBy, category, tag, page, numOfPages]);

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


                <FormControl sx={{ minWidth: 120 }} size="small">
                    <Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={'latest'}>Latest</MenuItem>
                        <MenuItem value={'oldest'}>Oldest</MenuItem>
                    </Select>
                </FormControl>
            </div>



            <div className={styles.cards}>
                {posts.map((item) => (
                    <BlogCard key={item._id} item={item} />
                ))}
            </div>

            {numOfPages > 1 && <div className={styles.page}>
                <Pagination size="large" page={page} count={Number(numOfPages)} onChange={handleChange} color="secondary" />
            </div>}

        </Box>
    )
}

export default Blog