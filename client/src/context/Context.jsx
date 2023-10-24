import { useContext, useReducer, createContext, useEffect, } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import reducer from "./reducer"

import {
    TOGGLE_MENU,
    TOGGLE_PROFILE_MENU,
    TOGGLE_ADMIN_MENU,
    TOGGLE_SEARCH,
    TOGGLE_AUTH_MODAL,
    REGISTER_ADMIN_BEGIN,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_ERROR,
    LOGIN_ADMIN_BEGIN,
    LOGIN_ADMIN_SUCCESS,
    LOGIN_ADMIN_ERROR,
    GET_ADMIN_BEGIN,
    GET_ADMIN_SUCCESS,
    GET_ADMIN_ERROR,
    UPLOAD_ITEM_BEGIN,
    UPLOAD_ITEM_SUCCESS,
    UPLOAD_ITEM_ERROR,
    GOOGLE_DRIVE_FILE_BEGIN,
    GOOGLE_DRIVE_FILE_SUCCESS,
    GOOGLE_DRIVE_FILE_ERROR,
    CANCEL_GOOGLE_DRIVE_FILE_UPLOAD,
    UPDATE_ADMIN_BEGIN,
    UPDATE_ADMIN_SUCCESS,
    UPDATE_ADMIN_ERROR,
    LOGOUT_USER
} from "./action"


const initialState = {
    isLoading: false,
    isRLLoading: false,
    isAdminLoading: false,
    userLoading: false,
    isUploading: false,
    toggleMenu: false,
    toggleProfileMenu: false,
    toggleAdminMenu: false,
    toggleAuthModal: false,
    toggleSearch: false,
    googleDriveFile: [],
    admin: [],
    driveId: "",
    driveName: ""
}

const Context = createContext({})

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    axios.defaults.withCredentials = true;
    const authFetch = axios.create({
        withCredentials: true,
        crossDomain: true,
    });


    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error)
        }
    )


    const controller = new AbortController();
    const { signal } = controller;

    const toggleMenuFn = () => {
        dispatch({ type: TOGGLE_MENU })
    }


    const toggleProfileMenuFn = () => {
        dispatch({ type: TOGGLE_PROFILE_MENU })
    }

    const toggleAdminMenuFn = () => {
        dispatch({ type: TOGGLE_ADMIN_MENU })
    }

    const toggleAuthModalFn = () => {
        dispatch({ type: TOGGLE_AUTH_MODAL })
    }

    const toggleSearchFn = () => {
        dispatch({ type: TOGGLE_SEARCH })
    }


    const adminregisterFn = async (userData) => {
        dispatch({ type: REGISTER_ADMIN_BEGIN });
        try {
            const response = await authFetch.post("/api/admin/register", userData);
            const { user } = response.data;
            dispatch({
                type: REGISTER_ADMIN_SUCCESS,
                payload: { user },
            });
            toast.success("Admin Created!,  Redirecting.....");
        } catch (error) {
            toast.error(error.response.data.msg);
            dispatch({
                type: REGISTER_ADMIN_ERROR,
                payload: { error },
            });
        }
    };

    const adminloginFn = async (userData) => {
        dispatch({ type: LOGIN_ADMIN_BEGIN });
        try {
            const { data } = await authFetch.post(
                "/api/admin/login",
                userData
            );
            const { user } = data;
            dispatch({
                type: LOGIN_ADMIN_SUCCESS,
                payload: { user },
            });
            toast.success("Login Successful!,  Redirecting.....");
        } catch (error) {
            toast.error(error.response.data.msg);
            dispatch({
                type: LOGIN_ADMIN_ERROR,
            });
        }
    };


    const uploadFn = async (userData) => {
        dispatch({ type: UPLOAD_ITEM_BEGIN });
        try {
            await authFetch.post(
                "/api/admin/add_item",
                userData
            )

            toast.success("Item add.....");
        } catch (error) {
            toast.error(error.response.data.msg);
            dispatch({
                type: UPLOAD_ITEM_ERROR,
            });
        }
    };

    const UploadFIle_toGoogleDrive = async (formData) => {
        dispatch({ type: GOOGLE_DRIVE_FILE_BEGIN });
        try {
            const response = await authFetch.post('/api/admin/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { googlefile } = response.data

            dispatch({ type: GOOGLE_DRIVE_FILE_SUCCESS, payload: { googlefile } })
            toast.success("Item uploaded on google drive.....");
        } catch (error) {
            toast.error(error.response.data.msg);
            dispatch({
                type: GOOGLE_DRIVE_FILE_ERROR,
            });
        }
    }

    const getAdmin = async () => {
        dispatch({ type: GET_ADMIN_BEGIN });
        try {
            const { data } = await authFetch('/api/admin/getAdmin', { signal });
            const { user } = data;

            dispatch({
                type: GET_ADMIN_SUCCESS,
                payload: { user },
            });
        } catch (error) {
            dispatch({ type: GET_ADMIN_ERROR })
            if (signal.aborted) return;
            if (error.response && error.response.status === 401) {
                logoutUser()
                return;
            }
        }
    };


    const updateAdmnFn = async (updateData) => {
        dispatch({ type: UPDATE_ADMIN_BEGIN });
        try {
            const {
                name,
                email,
                // password,
            } = updateData;
            const { data } = await authFetch.patch(" /api/admin/update ", {
                name,
                email,
                // password,
            });
            const { user } = data;
            dispatch({
                type: UPDATE_ADMIN_SUCCESS,
                payload: { user },
            });
            toast.success("Admin Profile, Updated!");
        } catch (error) {
            if (error.response.status !== 401) {
                toast.error(error.response.data.msg);
                dispatch({
                    type: UPDATE_ADMIN_ERROR,
                });
            }
        }
    };


    const cancelGoogleDriveFn = () => {
        dispatch({ type: CANCEL_GOOGLE_DRIVE_FILE_UPLOAD });
    }


    const logoutUser = async () => {
        try {
          await authFetch.post("/api/admin//logout");
          dispatch({ type: LOGOUT_USER });
        } catch (error) {
          console.log(error);
        }
      };


    useEffect(() => {
        getAdmin()
    }, [])


    return (
        <Context.Provider value={{ ...state, toggleMenuFn, toggleSearchFn, toggleAdminMenuFn, toggleProfileMenuFn, toggleAuthModalFn, adminregisterFn, adminloginFn, uploadFn, UploadFIle_toGoogleDrive, cancelGoogleDriveFn, updateAdmnFn,  logoutUser }} >
            {children}
        </Context.Provider>
    )
}

const useAppContext = () => {
    return useContext(Context)
}

export { ContextProvider, useAppContext, initialState,  };