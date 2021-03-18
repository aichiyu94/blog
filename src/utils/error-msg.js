export default {
    format: function(error){
        if(error.toString().indexOf('timeout') !== -1){
            return '请求超时';
        }
        return error;
    }
}