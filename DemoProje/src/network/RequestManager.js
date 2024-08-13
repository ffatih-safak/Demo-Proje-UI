
import BASE_URL from "../common/Const/ConstBaseUrl.js";
import axios from 'axios';
import METHOD_TYPE from '../common/Enum/EnumMetodTypes.js';
import { setOpen, setMesaj, setColor } from '../store/slices/toastrSlice.jsx';
import STATUS_CODES from '../common/Enum/EnumStatusCode.js';


export async function GenericRequest({url, params, methodType, dispatch, token, body = '',toaster}) {
    try {
        let _result = null;
        const requestUrl = BASE_URL.LocalUrl + url;
        if(token != null && token != undefined && token !=""){ 
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        if (methodType === METHOD_TYPE.GET) {
            await axios.get(requestUrl, { params: params })
                .then(function (result) {
                    _result = HandleResponse(result, dispatch,toaster);
                }, (axiosError) => {
                    _result = HandleResponse(axiosError.response, dispatch,toaster);
                });
            return _result;
            
        }
        else {
            await axios.post(requestUrl, body, {
                params: params
            })
                .then(function (result) {
                    _result = HandleResponse(result, dispatch,toaster);
                }, (axiosError) => {
                    _result = HandleResponse(axiosError.response, dispatch,toaster);
                });
            return _result;
        }
    } catch (error) {
        return HandleException('', '', '');
    }
};

export async function AuthRequest(url, params, dispatch) {
    try {

        let _result = null;
        const requestUrl = BASE_URL.LocalUrl + url;
        const headers = {
            "Content-Type": "application/json",
        };
        await axios.post(requestUrl, params, {
            headers: headers
        })
            .then(function (result) {
                _result = HandleResponse(result, dispatch,true);
            }
                , (axiosError) => {
                    debugger;
                    _result = HandleResponse(axiosError.response,true);
                });
        return _result;
    } catch (error) {
        return HandleException('', '', '');
    }
};

const HandleResponse = (response, dispatch,toaster) => {
    let handleResult = response.data;
    if(toaster == true){ 
        if (handleResult == "" || handleResult == undefined) {
            dispatch(setOpen(true));
            dispatch(setMesaj("No data found !"));
            dispatch(setColor(GetToastrColor("404")));
    
        }
        else {
            dispatch(setOpen(true));
            dispatch(setMesaj(handleResult.Message ? handleResult.Message : handleResult.message));
            const isSuccessful = handleResult.isSuccessful ? handleResult.isSuccessful : handleResult.IsSuccessful
            if (isSuccessful) {
                dispatch(setColor(GetToastrColor(STATUS_CODES.SUCCESS)));
            }
            else {
                dispatch(setColor(GetToastrColor(STATUS_CODES.NOT_FOUND)));
            }
        }
    }
   

    return handleResult;
};

export const HandleException = (baslik, icerik, token) => {
    //Log
};

export const GetToastrColor = (status) => {
    if (status == STATUS_CODES.NOT_FOUND)
        return "danger";
    else if (status == STATUS_CODES.SUCCESS)
        return "success";
    else
        return "info";

}