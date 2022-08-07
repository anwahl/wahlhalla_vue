import http from "../http-common";
class PersonDataService {
  getAll() {
    return http.get("/person");
  }
  get(id: any) {
    return http.get(`/person/${id}`);
  }
  create(data: any) {
    return http.post("/person", data);
  }
  update(id: any, data: any) {
    return http.put(`/person/${id}`, data);
  }
  delete(id: any) {
    return http.delete(`/person/${id}`);
  }
  findByName(name: any) {
    return http.get(`/person?name=${name}`);
  }
}
export default new PersonDataService();