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
    { name: "Angular", iconPath: "assets/svg/angular.svg" },
    { name: "Node.js", iconPath: "assets/svg/nodedotjs.svg" },
    { name: "JavaScript", iconPath: "assets/svg/javascript.svg" },
    { name: "Java", iconPath: "assets/svg/icons8-logotipo-de-java-coffee-cup.svg" },
    { name: "TypeScript", iconPath: "assets/svg/typescript.svg" },
    { name: "HTML", iconPath: "assets/svg/html5.svg" },
    { name: "CSS", iconPath: "assets/svg/css.svg" },
    { name: "Python", iconPath: "assets/svg/python.svg" },
    { name: "Git", iconPath: "assets/svg/github.svg" }, // Assuming github.svg for Git
    { name: "Tailwind", iconPath: "assets/svg/tailwindcss.svg" },
    { name: "SQLite", iconPath: "assets/svg/sqlite.svg" },
    { name: "SQL Server", iconPath: "assets/svg/icons8-servidor-microsoft-sql.svg" },
  ];
}
