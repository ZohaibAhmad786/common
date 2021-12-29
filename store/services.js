const UI_API = {
    getFormData: (object) => {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    },
    _returnError: error => {
        // console.log(error);
        if (error?.response?.request) {
            let { _response } = error?.response?.request;
            // return _response?.message
            console.log(_response);
            return JSON.parse(_response)?.message
                ? JSON.parse(_response)?.message.toString()
                : error.message?.toString();
        } else {
            if (error === 'Hi Dude') {
                return 'Dismiss';
            } else if (error?.message) {
                if (error?.message === 'Network Error') {
                    return 'Network Error';
                    //   return isArabic()?'خطأ في الشبكة':'Network Error'
                } else {
                    return error.message?.toString();
                }
            } else {
                return error?.toString();
            }
        }
    },
}

export default UI_API;