import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./myitems.module.css"
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Card } from "../../../components/export"




const MyItems = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [isLoading, setIsLoading] = useState(false)


    const fetchProducts = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('/api/admin/item', {
                params: {
                    page: 1,
                    limit: 5,
                    search,
                    sortBy,
                },
            });
            setIsLoading(false)
            setProducts(response.data.products);
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    };



    useEffect(() => {
        fetchProducts();
    }, [search, sortBy]);




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


            {isLoading ? <div className={styles.headContainer}> <h1 className={styles.heading}>LOADING.....🙄</h1> </div> :

                (products.length === 0 ?
                    <div className={styles.headContainer}> <h1 className={styles.heading}>No Products</h1> </div>
                    :
                    <div className={styles.cards}>
                        {products.map((item) => (
                            <Link key={item._id}><Card item={item} /></Link>
                        ))}
                    </div>

                )

            }

        </Box>
    )
}

export default MyItems