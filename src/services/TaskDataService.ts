import http from "../http-common";
class TaskDataService {
  getAll() {
    return http.get("/task");
  }
  get(id: number) {
    return http.get(`/task/${id}`);
  }
  create(data: any) {
    return http.post("/task", data);
  }
  update(id: number, data: any) {
    return http.put(`/task/${id}`, data);
  }
  delete(id: number) {
    return http.delete(`/task/${id}`);
  }
  findByType(type: number) {
    return http.get(`/task/type/${type}`);
  }
  findByDescription(description: string) {
    return http.get(`/task/description/${description}`);
  }
  findByTarget(target: number) {
    return http.get(`/task/target/${target}`);
  }
}
export default new TaskDataService();