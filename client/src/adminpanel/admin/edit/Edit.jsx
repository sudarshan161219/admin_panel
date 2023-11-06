import { useEffect, useState, useCallback } from "react"
import styles from "./index.module.css"
import axios from "axios"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { toast } from "react-hot-toast";


import {
    useParams
} from "react-router-dom";


const Edit = () => {
    const [item, setItem] = useState([])
    const [tags, setTags] = useState([])
    const [state, setState] = useState({
        name: '',
        description: '',
        price: '',
        tags: [],
        category: '',
    })
    const { id } = useParams()

    const fetchItem = async () => {
        try {
            const { data } = await axios.get(`/api/admin/get__single_item/${id}`)
            setItem(data.item)
        } catch (error) {
            console.log(error);
        }
    }

    const edit = async () => {
        try {
            await axios.patch(`/api/admin/get_edit_single_item/${id}`, state)
            toast.success("product successfully edited")

        } catch (error) {
            console.log(error);
        }
    }


    const updateState = useCallback(() => {
        if (item) {
            setState({
                ...state,
                name: item.name,
                description: item.description,
                price: item.price,
                tags: item.tags,
                category: item.category,
            });
        }
    }, [item, id]);

    useEffect(() => {
        fetchItem()
        updateState()

    }, [item.name, id])


    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        setState({
            ...state,
            tags: [...state.tags, value]
        });
        e.target.value = ''
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))
        setState({
            ...state,
            tags: tags.filter((el, i) => i !== index)
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleEdit = () => {
        edit()
    }


    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.headingContainer} >
                    <h1>Edit Item</h1>
                </div>



                <div className={styles.box}>
                    <FormControl>
                        <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
                        <OutlinedInput
                            onChange={handleInputChange}
                            value={state.name}
                            size="small"
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                            label="Name"
                            name="name"
                        />

                    </FormControl>


                    <textarea value={state.description} name="description" onChange={handleInputChange} className={styles.textarea} placeholder="product description"></textarea>

                    <FormControl >
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            onChange={handleInputChange}
                            size="small"
                            id="outlined-adornment-amount"
                            value={state.price}
                            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                            label="Amount"
                            name="price"
                            type="number"
                            min="0"
                        />

                    </FormControl>


                    <FormControl >
                        <InputLabel htmlFor="outlined-adornment-amount">Category</InputLabel>
                        <OutlinedInput
                            onChange={handleInputChange}
                            size="small"
                            id="outlined-adornment-amount"
                            value={state.category}
                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                            label="Category"
                            name="category"
                            type="text"

                        />

                    </FormControl>


                    <div className={styles.tagsinputcontainer}>
                        {
                            state.tags && state.tags.map((tag, index) => (
                                <div key={index} className={styles.tagitem}>
                                    <span className={styles.text}>{tag}</span>
                                    <span className={styles.close} onClick={() => removeTag(index)}>&times;</span>
                                </div>
                            ))
                        }

                        <input onKeyDown={handleKeyDown} type="text" name="tags" className={styles.tagsinput} placeholder="Tags" />
                    </div>
                </div>

                <div className={styles.btn}>

                    <Button fullWidth onClick={handleEdit} variant="contained">Edit</Button>
                </div>
            </div>
        </div>
    )
}

export default Edit