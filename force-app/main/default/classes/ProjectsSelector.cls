public with sharing class ProjectsSelector extends fflib_SObjectSelector {
    
    public Schema.SObjectType getSObjectType(){
        return Project__c.sObjectType;
     }
   
    public List<Schema.SObjectField> getSObjectFieldList(){
        return new List<Schema.SObjectField> {
            Project__c.Name,
            Project__c.Team_Size__c,
            Project__c.Description__c
        };
    }

    public List<Project__c> getAllProjects() {
        return Database.query(newQueryFactory().toSOQL());
    }
}