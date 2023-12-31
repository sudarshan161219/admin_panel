import { useState, useEffect } from 'react'
import styles from "./additem.module.css"
import { convertToBase64 } from "../../../utils/convert";
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useAppContext } from '../../../context/Context';
import { toast } from "react-hot-toast";
import { AiOutlineUpload } from "react-icons/ai"
import { FaGoogleDrive } from "react-icons/fa"

const AddItem = () => {
  const { uploadFn, isLoading, UploadFIle_toGoogleDrive, isUploading, cancelGoogleDriveFn, driveId,
    driveName } = useAppContext()


  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    tags: [],
    category: '',
    driveId: driveId,
    driveName: driveName
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null)
  const [file, setFile] = useState();
  const [tags, setTags] = useState([])


  useEffect(() => {
    setState({
      ...state,
      driveId: driveId,
      driveName: driveName
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driveId, driveName])


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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
    setState({
      ...state,
      imageUrl: base64
    });
  };

  const upload = () => {
    uploadFn(state);
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      toast.error("Please select a file to upload")
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    UploadFIle_toGoogleDrive(formData)

  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setSelectedImg(URL.createObjectURL(file));
    } else {
      setSelectedImg(null);
    }

  };

  const handelCancle = () => {
    cancelGoogleDriveFn()
    setSelectedImg(null);
  }

  return (
    <div className={styles.container}>

      <div className={styles.main}>

        <h1 className={styles.title}>Add Item</h1>

        <div className={styles.box}>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
            <OutlinedInput
              onChange={handleInputChange}
              size="small"
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              label="Name"
              name="name"
            />

          </FormControl>

          <textarea name="description" onChange={handleInputChange} className={styles.textarea} placeholder="product description"></textarea>

          <FormControl >
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              onChange={handleInputChange}
              size="small"
              id="outlined-adornment-amount"
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
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              label="Category"
              name="category"
              type="text"

            />

          </FormControl>


          <div className={styles.tagsinputcontainer}>
            {
              tags.map((tag, index) => (
                <div key={index} className={styles.tagitem}>
                  <span className={styles.text}>{tag}</span>
                  <span className={styles.close} onClick={() => removeTag(index)}>&times;</span>
                </div>
              ))
            }

            <input onKeyDown={handleKeyDown} type="text" name="tags" className={styles.tagsinput} placeholder="Tags" />
          </div>


          <div className={styles.boxcontainer}>
            <div style={{ height: file ? "auto" : "300px" }} className={styles.imginputcontainer}>
              <label htmlFor="profile">
                {file ? <img className={styles.selectedFile} src={file} alt="avatar" /> : <Chip className={styles.chip} label="Upload free file for display" variant="outlined" />}
              </label>
              <input
                className={styles.fileinput}
                type="file"
                id="profile"
                name="imageUrl"
                accept="image/*"
                onChange={onUpload}

              />
            </div>
            {file ?
              <Button size="small" onClick={() => setFile(null)} variant="contained">Cancle</Button> : null}
          </div>
        </div>

        <div className={styles.boxcontainer}>
          <div style={{ height: selectedImg ? "auto" : "300px" }} className={styles.imginputcontainer}>
            <label htmlFor="fileInput">
              {selectedImg ? <img className={styles.selectedFile} src={selectedImg} alt="avatar" /> : <Chip className={styles.chip} label="Upload paid file here..." variant="outlined" />}
            </label>
            <input
              className={styles.fileinput}
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          {selectedImg &&

            <div className={styles.btnContainer}>
              <Button disabled={isUploading} className={styles.btns} size="small" onClick={handelCancle} variant="contained">Cancle</Button>
              <Button disabled={isUploading} onClick={handleUpload} size="small" className={styles.btns} variant="contained" color="success">
                {isUploading ? "Please Wait..." : "Google Drive"}
                {isUploading ? null : <FaGoogleDrive className={styles.icon} />}
              </Button>

            </div>}
        </div>
        <Button disabled={driveId === ""} onClick={upload} variant="contained">Add Item</Button>

      </div>
    </div >
  )
}

export default AddItem