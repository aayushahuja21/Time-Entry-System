public with sharing class taskBoardController {
    
    @AuraEnabled(cacheable=true)
    public static List<Project__c> getProjects() {
        taskBoardService service = new taskBoardService();
        return service.getProjects();
    }

    @AuraEnabled(cacheable=true)
    public static List<Task__c> getTasks() {
        taskBoardService service = new taskBoardService();
        return service.getTasks();
    }
}