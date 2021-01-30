
import axios from 'axios';



const url = 'http://localhost:3001/api/stocktypes'

export default {
    delete: function (uuid) {
        return axios.delete(`${url}/${uuid}`)
    }
}