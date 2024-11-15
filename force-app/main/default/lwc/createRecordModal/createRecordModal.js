import { LightningElement, api } from 'lwc';
//Project Imports....
import PROJECT_OBJECT from '@salesforce/schema/Project__c';
import PROJECT_NAME_FIELD from '@salesforce/schema/Project__c.Name';
import PROJECT_OWNER_ID_FIELD from '@salesforce/schema/Project__c.OwnerId';
import PROJECT_TEAM_SIZE_FIELD from '@salesforce/schema/Project__c.Team_Size__c';
import PROJECT_DESCRIPTION_FIELD from '@salesforce/schema/Project__c.Description__c';
//Task Imports....
import TASK_OBJECT from '@salesforce/schema/Task__c';
import TASK_NAME_FIELD from '@salesforce/schema/Task__c.Name';
import TASK_PROJECT_FIELD from '@salesforce/schema/Task__c.Project__c';
import TASK_START_DATE_FIELD from '@salesforce/schema/Task__c.Start_Date__c';
import TASK_DESCRIPTION_FIELD from '@salesforce/schema/Task__c.Description__c';
import TASK_ADDITIONAL_INFORMATION_FIELD from '@salesforce/schema/Task__c.Additional_Information__c';
import TASK_EXPECTED_COMPLETION_DATE_FIELD from '@salesforce/schema/Task__c.Expected_Completion_Date__c';

export default class CreateRecordModal extends LightningElement {
    //public property
    @api title;
    
    fields;
    objectApiName;
    isLoading = true;

    connectedCallback() {
        if(this.title == 'Project') {
            this.objectApiName = PROJECT_OBJECT;
            this.fields = [
                {fieldName: PROJECT_NAME_FIELD, label: 'Name', required: true},
                {fieldName: PROJECT_DESCRIPTION_FIELD, label: 'Description'},
                {fieldName: PROJECT_TEAM_SIZE_FIELD, label: 'Team Size'},
                {fieldName: PROJECT_OWNER_ID_FIELD, label: 'Owner'}
            ];
        }
        else {
            this.objectApiName = TASK_OBJECT;
            this.fields = [
                {fieldName: TASK_PROJECT_FIELD, label: 'Project', required: true},
                {fieldName: TASK_NAME_FIELD, label: 'Task Name', required: true},
                {fieldName: TASK_START_DATE_FIELD, label: 'Start Date'},
                {fieldName: TASK_EXPECTED_COMPLETION_DATE_FIELD, label: 'Expected Completion Date'},
                {fieldName: TASK_DESCRIPTION_FIELD, label: 'Description'},
                {fieldName: TASK_ADDITIONAL_INFORMATION_FIELD, label: 'Additional Information'}
            ];
        }
    }

    handleOnLoad() {
        const spinner = this.refs.spinner;
        if (spinner) {
            spinner.remove(); 
        }
    }

    handleCloseModal() {
        //Custom Event to close the Modal in Parent Component
        const closeModalEvent = new CustomEvent('closemodal');
        this.dispatchEvent(closeModalEvent);
    }

    handleSuccess() {   
        //Custom Event to refresh the records in the datatable
        const refreshRecordsEvent = new CustomEvent('refreshrecords');
        this.dispatchEvent(refreshRecordsEvent);
        
        //Close the Modal
        this.handleCloseModal();
    }

    handleModalClick(event) {
        // Prevent closing when clicking inside the modal
        if (event.target.closest('.slds-modal__header') || (event.target.closest('.slds-modal__content'))) {
            return;
        }
        this.handleCloseModal();
    }
}