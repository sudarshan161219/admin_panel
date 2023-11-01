import { useState, useEffect } from "react";
import "./write.css"
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import imageCompression from "browser-image-compression";
import { toast } from "react-hot-toast";
import { convertToBase64 } from "../../../utils/convert";

import {
    formats,
    placeholder,
    modulesTool,
} from "../../../quill/tools";

const initialState = {
    title: "",
    content: "",
};

const Write = () => {

    const [state, setState] = useState({
        name: '',
        description: '',
        coverImg: '',
        author: '',
        content: '',
        tags: [],
        category: '',
    });
    const [value, setValue] = useState(initialState);
    const [file, setFile] = useState();
    const [vquill, setVQuill] = useState("");
    const [input, setInput] = useState("");
    const [tags, setTags] = useState([]);
    const [alert, setAlert] = useState("")



    const navigate = useNavigate();

    function htmlDecode(content) {
        let e = document.createElement('div');
        e.innerHTML = content;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    useEffect(() => {

        //   setVQuill(htmlDecode(content) || content);
        setState({
            ...state,
            content: vquill
        });


    }, [vquill]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        console.log(state);
        // const { title, coverImg, content } = data;



        // if (!title || !coverImg || !content) {
        //     toast.error("please provide all values");
        // } else {
        //     //   createPost(data);
        //     console.log(data);
        //     e.currentTarget.reset();
        // }
    };


    const handleChange = (e) => {
        setValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // const handleChangeQ = (e) => {
    //     setState({
    //         ...state,
    //         content: e.target.value
    //     });
    // }


    const onUpload = async (e) => {
        const event = e.target.files[0];
        const options = {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 500,
            useWebWorker: true,
            alwaysKeepResolution: true,
        };
        try {
            const compressedFile = await imageCompression(event, options);
            const base64 = await convertToBase64(compressedFile);
            setFile(base64);
            setState({
                ...state,
                coverImg: base64
            });
        } catch (error) {
            console.log(error);
        }
    };


    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };
    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        setState({
          ...state,
          tags: [...tags, value]
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

    return (
        <div className="row">
            <form onSubmit={handleSubmit} className="quill-form">
                <div className="form-row">
                    <div className="input-container">
                        <input
                            type="text"
                            name="name"
                            defaultValue={state.name}
                            onChange={handleInputChange}
                            className='title-input'
                            placeholder="Title"
                            required
                        />

                        <input
                            type="text"
                            name="description"
                            defaultValue={state.description}
                            onChange={handleInputChange}
                            className='title-input'
                            placeholder="Description"
                            required
                        />

                        <input
                            type="text"
                            name="category"
                            defaultValue={state.category}
                            onChange={handleInputChange}
                            className='title-input'
                            placeholder="Category"
                            required
                        />

                        <div className='tagsinputcontainer'>
                            {
                                tags.map((tag, index) => (
                                    <div key={index} className='tagitem'>
                                        <span className='text'>{tag}</span>
                                        <span className='close' onClick={() => removeTag(index)}>&times;</span>
                                    </div>
                                ))
                            }

                            <input onKeyDown={handleKeyDown} type="text" name="tags" className='tagsinput' placeholder="Tags" />
                        </div>

                        <div className="cover-img-container">
                            <label className="image-label" htmlFor="cover-image">
                                {file &&
                                    <img
                                        className="cover-img"
                                        src={file}
                                        alt="loading"
                                    />}
                                {file ? null : <div className="chip">  <Chip label="upload cover Image" variant="outlined" /></div>}
                            </label>
                            <input
                                type="file"
                                id="cover-image"
                                onChange={onUpload}
                                accept="image/*"
                            />
                        </div>
                    </div>



                    <div>
                        <ReactQuill
                            modules={modulesTool}
                            formats={formats}
                            theme="snow"
                            value={vquill}
                            placeholder={placeholder}
                            onChange={setVQuill}
                        />
                    </div>

                    <div className="btn-container">
                        <button
                            type="submit"

                            className="button-4 quill-btn"
                        >Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Write