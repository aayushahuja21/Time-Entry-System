public with sharing class TasksSelector extends fflib_SObjectSelector {
    
    public Schema.SObjectType getSObjectType(){
        return Task__c.sObjectType;
     }
   
    public List<Schema.SObjectField> getSObjectFieldList(){
        return new List<Schema.SObjectField> {
            Task__c.Name,
            Task__c.Project__c,
            Task__c.Start_Date__c,
            Task__c.Description__c,
            Task__c.Additional_Information__c,
            Task__c.Expected_Completion_Date__c             
        };
    }

    public List<Task__c> getAllTasks() {
        fflib_QueryFactory query = newQueryFactory();
        new ProjectsSelector().configureQueryFactoryFields(query, 'Project__r');
        return Database.query(query.toSOQL());
    }
}