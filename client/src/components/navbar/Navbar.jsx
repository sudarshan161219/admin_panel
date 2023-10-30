import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css"
import { useEffect, useState } from "react"
import logo from "../../assets/logo.png"
import { useAppContext } from "../../context/Context";
import { BiMenu } from "react-icons/bi"


const Navbar = () => {
  const { toggleMenu, toggleProfileMenu, toggleMenuFn, toggleProfileMenuFn, toggleAuthModalFn, toggleAuthModal, user } = useAppContext()
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation()



  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    if (toggleMenu || toggleProfileMenu || toggleAuthModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toggleMenu, toggleProfileMenu, toggleAuthModal]);


  return (
    <nav
      className={
        `${scrollPosition > 100 ? ` ${styles.stickyNav}` : `${styles.container}`}`
      }>

      <div className={styles.LogoContainer}>
        <BiMenu onClick={toggleMenuFn} className={styles.icon} />
        <Link to="/" ><img className={styles.logo} src={logo} alt="logo" /></Link>
      </div>


      <div className={styles.loginProfileContainer}  >
        <ul className={styles.ul}>
          <li className={styles.li}> <Link to="/" className={styles.link}>Home</Link> </li>
          <li className={styles.li}> <Link to="/Portfolio" className={styles.link}>Portfolio</Link> </li>
          <li className={styles.li}> <Link to="/Blog" className={styles.link}>Blog</Link> </li>
          <li className={styles.li}> <Link to="/AboutUs" className={styles.link}>About Us</Link> </li>
          <li className={styles.li}> <Link to="/ContactUs" className={styles.link}>Contact Us</Link> </li>
        </ul>
        {user && user.name ? <div onClick={toggleProfileMenuFn} className={styles.plink} to="/user-profile" ><img className={styles.Plogo} src={user.userImg} alt={user.name} /></div> :
          <button onClick={toggleAuthModalFn} className={styles.login}>Log in</button>
        }

      </div>
    </nav>
  )
}

export default Navbar