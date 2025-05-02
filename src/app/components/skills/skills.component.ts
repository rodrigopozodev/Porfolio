import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  iconText: string; // Placeholder text for icon
  iconClass: string; // Tailwind classes for styling
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  skills: Skill[] = [
    { name: "Angular", iconText: "Ng", iconClass: "text-red-500" },
    { name: "Node.js", iconText: "Node", iconClass: "text-green-600" },
    { name: "JavaScript", iconText: "JS", iconClass: "text-yellow-500" },
    { name: "Java", iconText: "Java", iconClass: "text-orange-500" },
    { name: "TypeScript", iconText: "TS", iconClass: "text-blue-600" },
    { name: "HTML", iconText: "HTML", iconClass: "text-orange-500" },
    { name: "CSS", iconText: "CSS", iconClass: "text-blue-500" },
    { name: "Python", iconText: "Py", iconClass: "text-green-500" },
    { name: "Git", iconText: "Git", iconClass: "text-orange-600" },
    { name: "Tailwind", iconText: "TW", iconClass: "text-cyan-500" },
    { name: "SQLite", iconText: "DB", iconClass: "text-blue-gray-500" }, // Adjusted icon and color
    { name: "SQL Server", iconText: "SQL", iconClass: "text-blue-700" }, // Adjusted icon and color
  ];
}
