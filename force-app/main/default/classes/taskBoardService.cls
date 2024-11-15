public with sharing class taskBoardService {

    public List<Project__c> getProjects() {
        ProjectsSelector selector = new ProjectsSelector();
        return selector.getAllProjects();
    }

    public List<Task__c> getTasks() {
        TasksSelector selector = new TasksSelector();
        return selector.getAllTasks();
    }
}