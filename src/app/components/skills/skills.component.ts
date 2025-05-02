import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  iconPath: string; // Path to the SVG icon
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  skills: Skill[] = [
    { name: "Angular", iconPath: "assets/icons/angular.svg" },
    { name: "Node.js", iconPath: "assets/icons/nodejs.svg" },
    { name: "JavaScript", iconPath: "assets/icons/javascript.svg" },
    { name: "Java", iconPath: "assets/icons/java.svg" },
    { name: "TypeScript", iconPath: "assets/icons/typescript.svg" },
    { name: "HTML", iconPath: "assets/icons/html.svg" },
    { name: "CSS", iconPath: "assets/icons/css.svg" },
    { name: "Python", iconPath: "assets/icons/python.svg" },
    { name: "Git", iconPath: "assets/icons/git.svg" },
    { name: "Tailwind", iconPath: "assets/icons/tailwind.svg" },
    { name: "SQLite", iconPath: "assets/icons/sqlite.svg" },
    { name: "SQL Server", iconPath: "assets/icons/sqlserver.svg" },
  ];
}
