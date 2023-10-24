import {
    TOGGLE_MENU,
    TOGGLE_PROFILE_MENU,
    TOGGLE_ADMIN_MENU,
    TOGGLE_SEARCH,
    TOGGLE_AUTH_MODAL,
    TOGGLE_EDIT_USER_BEGIN,
    TOGGLE_EDIT_USER_SUCCESS,
    TOGGLE_EDIT_USER_ERROR,
    REGISTER_ADMIN_BEGIN,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_ERROR,
    LOGIN_ADMIN_BEGIN,
    LOGIN_ADMIN_SUCCESS,
    LOGIN_ADMIN_ERROR,
    GET_CURRENT_USER_BEGIN,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_ERROR,
    GET_ADMIN_BEGIN,
    GET_ADMIN_SUCCESS,
    GET_ADMIN_ERROR,
    UPLOAD_ITEM_BEGIN,
    UPLOAD_ITEM_SUCCESS,
    UPLOAD_ITEM_ERROR,
    GOOGLE_DRIVE_FILE_BEGIN,
    GOOGLE_DRIVE_FILE_SUCCESS,
    GOOGLE_DRIVE_FILE_ERROR,
    LOGOUT_USER,
    CANCEL_GOOGLE_DRIVE_FILE_UPLOAD,
    UPDATE_ADMIN_BEGIN,
    UPDATE_ADMIN_SUCCESS,
    UPDATE_ADMIN_ERROR,
} from "./action"


import { initialState } from "./Context";

const reducer = (state, action) => {

    if (action.type === TOGGLE_MENU) {
        return {
            ...state,
            toggleMenu: !state.toggleMenu
        }
    }

    if (action.type === TOGGLE_PROFILE_MENU) {
        return {
            ...state,
            toggleProfileMenu: !state.toggleProfileMenu
        }
    }

    if (action.type === TOGGLE_ADMIN_MENU) {
        return {
            ...state,
            toggleAdminMenu: !state.toggleAdminMenu
        }
    }

    if (action.type === TOGGLE_AUTH_MODAL) {
        return {
            ...state,
            toggleAuthModal: !state.toggleAuthModal
        }
    }

    if (action.type === TOGGLE_SEARCH) {
        return {
            ...state,
            toggleSearch: !state.toggleSearch,
        }
    }


    if (action.type === TOGGLE_EDIT_USER_BEGIN) {
        return { ...state, isRLLoadin: true };
    }

    if (action.type === TOGGLE_EDIT_USER_SUCCESS) {
        return {
            ...state,
            isRLLoadin: false,
            user: action.payload.user,
        };
    }

    if (action.type === TOGGLE_EDIT_USER_ERROR) {
        return {
            ...state,
            isRLLoadin: false,
            msg: action.payload.msg
        };
    }


    if (action.type === REGISTER_ADMIN_BEGIN) {
        return { ...state, isAdminLoading: true };
    }

    if (action.type === REGISTER_ADMIN_SUCCESS) {
        return {
            ...state,
            isAdminLoading: false,
            admin: action.payload.user,
        };
    }

    if (action.type === REGISTER_ADMIN_ERROR) {
        return {
            ...state,
            isAdminLoading: false,
        };
    }

    if (action.type === LOGIN_ADMIN_BEGIN) {
        return { ...state, isAdminLoading: true };
    }

    if (action.type === LOGIN_ADMIN_SUCCESS) {
        return {
            ...state,
            isAdminLoading: false,
            admin: action.payload.user,
        };
    }

    if (action.type === LOGIN_ADMIN_ERROR) {
        return {
            ...state,
            isAdminLoading: false,
        };
    }

    if (action.type === GET_CURRENT_USER_BEGIN) {
        return {
            ...state,
            userLoading: true
        }
    }

    if (action.type === GET_CURRENT_USER_SUCCESS) {
        return {
            ...state,
            userLoading: false,
            user: action.payload.user
        }
    }

    if (action.type === GET_CURRENT_USER_ERROR) {
        return {
            ...state,
            userLoading: false,
        };
    }

    if (action.type === GET_ADMIN_BEGIN) {
        return {
            ...state,
            isAdminLoading: true
        }
    }

    if (action.type === GET_ADMIN_SUCCESS) {
        return {
            ...state,
            isAdminLoading: false,
            admin: action.payload.user
        }
    }

    if (action.type === GET_ADMIN_ERROR) {
        return {
            ...state,
            isAdminLoading: false,
        };
    }

    if (action.type === UPLOAD_ITEM_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === UPLOAD_ITEM_SUCCESS) {
        return {
            ...state,
            isLoading: false,
        }
    }

    if (action.type === UPLOAD_ITEM_ERROR) {
        return {
            ...state,
            isLoading: false,
        };
    }

    if (action.type === GOOGLE_DRIVE_FILE_BEGIN) {
        return {
            ...state,
            isUploading: true
        }
    }

    if (action.type === GOOGLE_DRIVE_FILE_SUCCESS) {
        return {
            ...state,
            isUploading: false,
            googleDriveFile: action.payload.googlefile
        }
    }

    if (action.type === GOOGLE_DRIVE_FILE_ERROR) {
        return {
            ...state,
            isUploading: false,
        };
    }

    if (action.type === CANCEL_GOOGLE_DRIVE_FILE_UPLOAD) {
        return {
            ...state,
            googleDriveFile: []
        };
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            admin: null,
            googleDriveFile:null,
            userLoading: false
        };
    }

    if (action.type === UPDATE_ADMIN_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === UPDATE_ADMIN_SUCCESS) {
        return {
            ...state,
            isAdminLoading: false,
            admin: action.payload.user,
        };
    }

    if (action.type === UPDATE_ADMIN_ERROR) {
        return {
            ...state,
            isLoading: false,
        };
    }




    throw new Error(`no such action : ${action.type}`);
}

export default reducer;

