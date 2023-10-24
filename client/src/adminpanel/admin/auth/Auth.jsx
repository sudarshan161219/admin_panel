import { useState, useEffect } from 'react'
import styles from "./auth.module.css"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useAppContext } from "../../../context/Context"
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const { adminregisterFn, adminloginFn, admin } = useAppContext()
    const [show, setShow] = useState(false)
    const [isMember, setIsMember] = useState(false)
    const navigate = useNavigate();


    const handleShowPassword = () => {
        setShow(!show)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        if (isMember) {
            adminloginFn(data);
        } else {
            adminregisterFn(data);
        }
        e.currentTarget.reset();
    };


    const handleIsMember = () => {
        setIsMember(!isMember)
    }


    useEffect(() => {
        if (!admin) {
            navigate("/");
        } else {
            navigate("/admin")
        }
    }, [admin, navigate]);


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.formContainer} >
                    <h1 className={styles.title}>Admin Panel</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>

                        {isMember ? null : <div className={styles.group}>
                            <input name='name' className={styles.input} type="text" required />
                            <span className={styles.bar}></span>
                            <label className={styles.label}>Name</label>
                        </div>}


                        <div className={styles.group}>
                            <input name='email' className={styles.input} type="text" required />
                            <span className={styles.bar}></span>
                            <label className={styles.label}>Email Address</label>
                        </div>


                        <div className={`${styles.group} ${styles.passwordContainer}`}>
                            <input name='password' className={styles.input} type={show ? "text" : "password"} required />
                            <span className={styles.bar}></span>
                            <label className={styles.label}>Password</label>

                            {show ? <AiOutlineEyeInvisible onClick={handleShowPassword} className={styles.pIcon} /> :
                                <AiOutlineEye onClick={handleShowPassword} className={styles.pIcon} />
                            }
                        </div>
                        <button className={`${styles.btn} ${styles.button}`}>{isMember ? "Login" : "Create Account"}</button>
                    </form>
                    <p className={styles.desc}>
                        {`${isMember ? "Don't" : "Already"} have a account?`} <span
                            onClick={handleIsMember} className={styles.descSpan}> {isMember ? "Sign Up" : "Log In"}  </span> </p>
                </div>

            </div>
        </div>
    )
}

export default Auth