import http from "../http-common";
class TargetDataService {
  getAll() {
    return http.get("/target");
  }
  get(id: number) {
    return http.get(`/target/${id}`);
  }
  create(data: any) {
    return http.post("/target", data);
  }
  update(id: number, data: any) {
    return http.put(`/target/${id}`, data);
  }
  delete(id: number) {
    return http.delete(`/target/${id}`);
  }
  findByType(type: number) {
    return http.get(`/target/type/${type}`);
  }
  findByDescription(description: string) {
    return http.get(`/target/description/${description}`);
  }
}
export default new TargetDataService();