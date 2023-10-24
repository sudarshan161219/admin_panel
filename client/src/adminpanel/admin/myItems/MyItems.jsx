import styles from "./myitems.module.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
import { useEffect } from "react";
import { useAppContext } from "../../../context/Context";
import {
    AiOutlineDownload
} from "react-icons/ai"
import {
    GrFavorite
} from "react-icons/gr"


const MyItems = () => {
    const { getProductFn, products, isLoading } = useAppContext()

    useEffect(() => {
        getProductFn()
    }, [])


    if (isLoading) {
        return <h1>LOADING.....🙄</h1>
    }

    return (
        <Box className={styles.container}>
            <div className={styles.inputContainer} >
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}
                >
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search "
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                </Paper>
            </div>

            {products.length === 0 ?  
            
            <div className={styles.headContainer}> <h1  className={styles.heading}>No Products</h1> </div>

            :

            <div className={styles.downloadsContainer} >
                {products.map((item, idx) => (
                    <div key={idx} className={styles.card}>
                        <div className={styles.imgContainer}>
                            <img className={styles.img} src={item.imageUrl} alt={item.name} />
                        </div>

                        <div className={styles.InfoContainer}>
                            <span>name: {item.name}</span>
                            <span>category: {item.category}</span>
                            <span>price: ₹{item.price}</span>

                            <div className={styles.tagContainer} >
                                 {item.tags.map((item, idx) => <span key={idx}>{item}</span>)}
                            </div>
                           

                            <div className={styles.stats} >
                                <Chip icon={<AiOutlineDownload />} label="10" variant="outlined" />
                                <Chip icon={<GrFavorite />} label="100" variant="outlined" />
                            </div>
                        </div>
                    </div>

                ))}
            </div>
             }
        </Box>
    )
}

export default MyItems