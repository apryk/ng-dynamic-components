import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PeopleService } from './people/people.service';
import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('personEdit') personEditTemplate;
  @ViewChild(TabsComponent) tabsComponent: TabsComponent;
  people;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.peopleService.getPeople().subscribe((data) => {
      this.people = data;
    });

    console.log(this.personEditTemplate);
  }

  onEditPerson(person) {
    this.tabsComponent.openTab(
      `Editing ${person.name}`,
      this.personEditTemplate,
      person,
      true
    );
  }

  onAddPerson() {
    this.tabsComponent.openTab('New Person', this.personEditTemplate, {}, true);
  }

  onPersonFormSubmit(dataModel) {
    if (dataModel.id > 0) {
      this.people = this.people.map((person) => {
        if (person.id === dataModel.id) {
          return dataModel;
        } else {
          return person;
        }
      });
    } else {
      // create a new one
      dataModel.id = Math.round(Math.random() * 100);
      this.people.push(dataModel);
    }

    this.tabsComponent.closeActiveTab();
  }
}
