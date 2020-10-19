import axios from 'axios';

export default class CarService {

    url = "http://localhost:4000/api/";

    getAll() {
        return axios.get(this.url + 'cars');
    }

    save(car) {
        return axios.post(this.url + 'cars', car);
    }

    edit(id, car) {
        return axios.put(this.url + `cars/${id}`, car);
    }

    delete(id) {
        return axios.delete(this.url + `cars/${id}`);
    }
}