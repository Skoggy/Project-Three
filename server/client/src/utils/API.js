
import axios from 'axios';

const stockUrl = '/api/stocks'

const stockTypesUrl = '/api/stocktypes'

export default {
    delete: function (uuid) {
        return axios.delete(`${stockTypesUrl}/${uuid}`)
    },
    deleteStock: function (uuid) {
        return axios.delete(`${stockUrl}/${uuid}`)
    }
}



