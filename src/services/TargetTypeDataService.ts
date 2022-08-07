import http from "../http-common";
class TargetTypeDataService {
  getAll() {
    return http.get("/targetType");
  }
  get(id: number) {
    return http.get(`/targetType/${id}`);
  }
  create(data: any) {
    return http.post("/targetType", data);
  }
  update(id: number, data: any) {
    return http.put(`/targetType/${id}`, data);
  }
  delete(id: number) {
    return http.delete(`/targetType/${id}`);
  }
  findByDescription(description: string) {
    return http.get(`/targetType/description/${description}`);
  }
}
export default new TargetTypeDataService();