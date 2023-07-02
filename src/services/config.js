import axios from 'axios'

/*
// Rodas com IPV4: json-server --watch -d 180 --host 192.168.0.110 db.json
*/

const api = axios.create({
    baseURL: 'http://192.168.0.110:3000'
})

export default api