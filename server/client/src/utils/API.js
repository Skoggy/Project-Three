
import axios from 'axios';

const stockUrl = 'http://localhost:3001/api/stocks'

const stockTypesUrl = 'http://localhost:3001/api/stocktypes'

export default {
    delete: function (uuid) {
        return axios.delete(`${stockTypesUrl}/${uuid}`)
    },
    deleteStock: function (uuid) {
        return axios.delete(`${stockUrl}/${uuid}`)
    }
}



