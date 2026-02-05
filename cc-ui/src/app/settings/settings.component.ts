import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  activeTab: string = 'integrations';

  tabs = [
    { id: 'integrations', label: 'Integrations' },
    { id: 'optimizer', label: 'Optimizer' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'preferences', label: 'Preferences' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
