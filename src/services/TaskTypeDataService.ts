import http from "../http-common";
class TaskTypeDataService {
  getAll() {
    return http.get("/taskType");
  }
  get(id: number) {
    return http.get(`/taskType/${id}`);
  }
  create(data: any) {
    return http.post("/taskType", data);
  }
  update(id: number, data: any) {
    return http.put(`/taskType/${id}`, data);
  }
  delete(id: number) {
    return http.delete(`/taskType/${id}`);
  }
  findByCategory(category: string) {
    return http.get(`/taskType/category/${category}`);
  }
  findByDescription(description: string) {
    return http.get(`/taskType/description/${description}`);
  }
}
export default new TaskTypeDataService();