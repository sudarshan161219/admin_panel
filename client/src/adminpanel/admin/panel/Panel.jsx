import React, { useState } from 'react';
import styles from "./panel.module.css"
import { useAppContext } from '../../../context/Context';
import { AiOutlineEdit } from "react-icons/ai"
import { Ripple } from "../../../components/export"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { RiAdminLine } from "react-icons/ri"
import { AiOutlineMail, AiOutlineLogout } from "react-icons/ai"
import { PiPasswordBold } from "react-icons/pi"
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function MyForm() {
    const { admin, updateAdmnFn, logoutUser } = useAppContext()
    const [namevalue, setNamevalue] = useState(admin.name);
    const [emailvalue, setEmailvalue] = useState(admin.email);
    const [passwordvalue, setPasswordvalue] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const handleEditName = () => {
        setIsEditingName(!isEditingName);
    };

    const handleEditEmail = () => {
        setIsEditingEmail(!isEditingEmail);
    };

    const handleEditPassword = () => {
        setIsEditingPassword(!isEditingPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const data = Object.fromEntries(formData);
        data.name = namevalue;
        data.email = emailvalue;
        data.password = passwordvalue;
        updateAdmnFn(data)
    };

    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles.heading}>Admin Panel</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.blox}>
                    {isEditingName ? (
                        <div>

                            <div className={styles.iconInput}>
                                <RiAdminLine className={styles.icon} />
                                <input className={styles.input} type="text" value={namevalue} onChange={(e) => setNamevalue(e.target.value)} />
                            </div>

                            <div className={styles.btnContainer}>
                                {isEditingName || isEditingEmail || isEditingPassword ? (
                                    <Button size="small" type="submit" color="success">Save</Button>
                                ) : null}
                                <Button size="small" type="button" onClick={handleEditName}>Cancel</Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <span className={styles.span}> <RiAdminLine className={styles.icon} /> {namevalue}</span>
                            <IconButton onClick={handleEditName} aria-label="fingerprint" color="secondary">
                                <EditIcon />
                            </IconButton>
                        </div>
                    )}
                </div>




                <div className={styles.blox}>
                    {isEditingEmail ? (
                        <div>
                            <div className={styles.iconInput}>
                                <AiOutlineMail className={styles.icon} />
                                <input className={styles.input} type="email" value={emailvalue} onChange={(e) => setEmailvalue(e.target.value)} />
                            </div>



                            <div className={styles.btnContainer}>
                                {isEditingName || isEditingEmail || isEditingPassword ? (
                                    <Button size="small" onClick={handleEditEmail} type="submit" color="success">Save</Button>
                                ) : null}
                                <Button size="small" type="button" onClick={handleEditEmail}>Cancel</Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <span className={styles.span}><AiOutlineMail className={styles.icon} />{emailvalue}</span>
                            <IconButton onClick={handleEditEmail} aria-label="fingerprint" color="secondary">
                                <EditIcon />
                            </IconButton>
                        </div>
                    )}
                </div>


                <div className={styles.blox}>
                    {/* {isEditingPassword ? (
                        <div>

                            <div className={styles.iconInput}>
                                <PiPasswordBold className={styles.icon} />
                                <input className={styles.input} type="password" value={passwordvalue} onChange={(e) => setPasswordvalue(e.target.value)} />
                            </div>

                            <div className={styles.btnContainer}>
                                {isEditingName || isEditingEmail || isEditingPassword ? (
                                    <Button size="small" type="submit" color="success">Save</Button>
                                ) : null}
                                <Button size="small" type="button" onClick={handleEditPassword}>Cancel</Button>
                            </div>

                        </div>
                    ) : (
                        <div>
                            <span className={styles.span}><PiPasswordBold className={styles.icon} /> {'********'} </span>
                            <IconButton onClick={handleEditPassword} aria-label="fingerprint" color="secondary">
                                <EditIcon />
                            </IconButton>
                        </div>
                    )} */}
                    <div>
                        <span className={styles.span}><PiPasswordBold className={styles.icon} /> {'********'} </span>
                        {/* <IconButton onClick={handleEditPassword} aria-label="fingerprint" color="secondary">
                                <EditIcon />
                            </IconButton> */}
                    </div>
                </div>
            </form>

            <div className={styles.bloxx}>
                <div className={styles.btnLo}>
                    <Button onClick={logoutUser} variant="outlined" color="error">
                        Logout  <AiOutlineLogout className={styles.icons} />
                    </Button>
                </div>
            </div>

        </div>
    );
}

export default MyForm;
