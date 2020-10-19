import axios from 'axios';

export default class DriverService {

    url = "http://localhost:4000/api/";

    getAll() {
        return axios.get(this.url + 'drivers');
    }

    save(car) {
        return axios.post(this.url + 'drivers', car);
    }

    edit(id, car) {
        return axios.put(this.url + `drivers/${id}`, car);
    }

    delete(id) {
        return axios.delete(this.url + `drivers/${id}`);
    }
}