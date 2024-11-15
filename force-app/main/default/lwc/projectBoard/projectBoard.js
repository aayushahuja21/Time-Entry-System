import { LightningElement, api} from 'lwc';

export default class ProjectBoard extends LightningElement {
    projectIcon;
    projectTitle;
    projectAltText;
    
    connectedCallback() {
        this.projectTitle = 'Project';
        this.projectIcon = 'custom:custom84';
        this.projectAltText = 'Project Icon';
    }
}
