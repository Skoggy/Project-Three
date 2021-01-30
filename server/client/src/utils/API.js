
import axios from 'axios';



const url = '/api/stocktypes'

export default {
    delete: function (uuid) {
        return axios.delete(`${url}/${uuid}`)
    }
}