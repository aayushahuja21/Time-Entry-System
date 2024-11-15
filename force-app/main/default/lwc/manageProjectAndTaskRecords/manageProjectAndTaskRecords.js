import{ refreshApex } from '@salesforce/apex';
import { LightningElement, api, wire, track } from 'lwc';
import getTasks from '@salesforce/apex/taskBoardController.getTasks';
import getProjects from '@salesforce/apex/taskBoardController.getProjects';

const ACTIONS = [
    { label: 'Edit', name: 'edit_project' },
    { label: 'Delete', name: 'delete_project'}
];

const PROJECT_COLUMNS = [
    {
        label: 'Project Name',
        fieldName: 'nameURL',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'Name' }, // Displayed as a clickable label
            target: '_blank' // Opens in a new tab
        }
    },
    { label: 'Description', fieldName: 'Description__c'},
    { label: 'Team Size', fieldName: 'Team_Size__c'},
    {
        type: 'action',
        typeAttributes: { rowActions: ACTIONS },
    }
];

const TASK_COLUMNS = [
    {
        label: 'Project Name',
        fieldName: 'projectURL',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'projectName' }, // Displayed as a clickable label
            target: '_blank' // Opens in a new tab
        }
    },
    {
        label: 'Task Name',
        fieldName: 'nameURL',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'Name' }, // Displayed as a clickable label
            target: '_blank' // Opens in a new tab
        }
    },
    { label: 'Start Date', fieldName: 'Start_Date__c'},
    { label: 'Expected Completion Date', fieldName: 'Expected_Completion_Date__c'},
    { label: 'Description', fieldName: 'Description__c'},
    { label: 'Additional Information', fieldName: 'Additional_Information__c'},
    {
        type: 'action',
        typeAttributes: { rowActions: ACTIONS },
    }
]

export default class ManageProjectAndTaskRecords extends LightningElement {
    
    error;
    columns;
    wiredTaskResult;
    wiredProjectResult;
    createNewProductModal;

    data = [];
    taskData=[];
    projectData =[];

    // Public properties
    @api title;
    @api altText;
    @api projectIcon;
        
    @wire(getProjects)
    projects(result) {
        this.wiredProjectResult = result;
        if (result.data) {
            console.log('Project Data: ',result.data);  
            this.projectData = result.data.map((project) => {
                return {
                    ...project,
                    nameURL: '/' + project.Id // This sets the URL for the Name field
                };
            });           
            console.log('Wire projectData: ', JSON.stringify(this.projectData));
        } 
        else if (result.error) {
            console.error('Error: ',result.error);     
            this.error = result.error;
            this.projectData = undefined;
        }
    }

    @wire(getTasks)
    tasks(result) {
        this.wiredTaskResult = result;
        if (result.data) {
            console.log('Task Data: ',result.data);  
            const mappedData = result.data.map((task) => {
                return {
                    ...task,
                    nameURL: '/' + task.Id, // This sets the URL for the Name field
                    projectURL: '/' + task.Project__r.Id,
                    projectName: task.Project__r.Name
                };
            });    
            console.log('Before: ', JSON.stringify(mappedData));
                  
            this.taskData = this.sortData(mappedData, 'projectName', 'asc'); // Sort by Name 
            console.log('Wire projectData: ', JSON.stringify(this.taskData));

            console.log('After: ', JSON.stringify(mappedData));
            console.log('After taskData: ', JSON.stringify(this.taskData));

        } 
        else if (result.error) {
            console.error('Error: ',result.error);     
            this.error = result.error;
            this.taskData = undefined;
        }
    }

    get recordData() {
        if(this.title == 'Project') {   
            this.data = this.projectData;
            this.columns = PROJECT_COLUMNS;         
        }
        else {
            this.data = this.taskData;
            this.columns = TASK_COLUMNS;
        }
        return this.data;
    }

    get buttonLabel() {
        return `New ${this.title}`; 
    }

    //Row-Action Handler
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'edit_project':
                //this.deleteRow(row); ----- Delete Project Function
                break;
            case 'delete_project':
                //this.showRowDetails(row); ----- Edit Project Function
                break;
            default:
        }
    }

    handleNewClick(event) {
        console.log('Opened: ',event.target.label)
        this.createNewProductModal = true;
    }

    handleCloseModal() {
        this.createNewProductModal = false;
    }

    refreshData(){
        console.log('Data Refresh');
        if(this.title == 'Task') { 
            return refreshApex(this.wiredTaskResult);
        }
        else {
            return refreshApex(this.wiredProjectResult);
        }
    }

    //Sort Function -- this.sortData(mappedData, 'projectName', 'asc'); // Sort by Name 

    sortData(data, fieldName, sortDirection) {
        data.sort((a, b) => {
            const first = a[fieldName]; 
            const second = b[fieldName];

            console.log('First: ',first);
            console.log('Second: ',second);            

            console.log(first.localeCompare(second));           
            
            return first.localeCompare(second);
        });
        return data;
    }
}
