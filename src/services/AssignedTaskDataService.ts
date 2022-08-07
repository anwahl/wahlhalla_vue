import http from "../http-common";
class AssignedTaskDataService {
  getAll() {
    return http.get("/assignedTask");
  }
  get(id: number) {
    return http.get(`/assignedTask/${id}`);
  }
  create(data: any) {
    return http.post("/assignedTask", data);
  }
  update(id: number, data: any) {
    return http.put(`/assignedTask/${id}`, data);
  }
  delete(id: number) {
    return http.delete(`/assignedTask/${id}`);
  }
  findByPerson(person: number) {
    return http.get(`/assignedTask/person/${person}`);
  }
  findByType(type: number) {
    return http.get(`/assignedTask/type/${type}`);
  }
  findByCompletion(complete: boolean) {
    return http.get(`/assignedTask/completion/${complete}`);
  }
  findByDueDate(dueDate: Date) {
    return http.get(`/assignedTask/dueDate/${dueDate}`);
  }
  findByQuery(person: number, type: string, complete: boolean, dueDate: Date) {
    return http.get(`/assignedTask/query?person=${person}&type=${type}&complete=${complete}&dueDate=${dueDate}`);
  }
}
export default new AssignedTaskDataService();