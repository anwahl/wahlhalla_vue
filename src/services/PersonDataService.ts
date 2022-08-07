import http from "../http-common";
class PersonDataService {
  getAll() {
    return http.get("/person");
  }
  get(id: number) {
    return http.get(`/person/${id}`);
  }
  create(data: any) {
    return http.post("/person", data);
  }
  update(id: number, data: any) {
    return http.put(`/person/${id}`, data);
  }
  delete(id: number) {
    return http.delete(`/person/${id}`);
  }
  findByName(name: string) {
    return http.get(`/person/name/${name}`);
  }
}
export default new PersonDataService();