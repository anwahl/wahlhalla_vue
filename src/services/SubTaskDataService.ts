import http from "../http-common";
class SubtaskDataService {
  getAll() {
    return http.get("/subtask");
  }
  get(id: number) {
    return http.get(`/subtask/${id}`);
  }
  create(data: any) {
    return http.post("/subtask", data);
  }
  update(id: number, data: any) {
    return http.put(`/subtask/${id}`, data);
  }
  delete(id: number) {
    return http.delete(`/subtask/${id}`);
  }
  findByTask(task: number) {
    return http.get(`/subtask/task/${task}`);
  }
  findByDescription(description: string) {
    return http.get(`/subtask/description/${description}`);
  }
}
export default new SubtaskDataService();