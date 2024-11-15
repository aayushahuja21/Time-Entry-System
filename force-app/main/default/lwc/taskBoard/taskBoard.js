import { LightningElement } from 'lwc';

export default class TaskBoard extends LightningElement {
    taskIcon;
    taskTitle;
    taskAltText;
    
    connectedCallback() {
        this.taskTitle = 'Task';
        this.taskIcon = 'custom:custom62';
        this.taskAltText = 'Task Icon';
    }
}