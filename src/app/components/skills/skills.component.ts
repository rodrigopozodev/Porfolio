import { Component } from '@angular/core';

interface Skill {
  name: string;
  iconText: string; // Placeholder text for icon
  iconClass: string; // Tailwind classes for styling
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [], // Removed CommonModule
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  skills: Skill[] = [
    { name: "JavaScript", iconText: "JS", iconClass: "text-yellow-500" },
    { name: "Angular", iconText: "Ng", iconClass: "text-red-500" },
    { name: "HTML", iconText: "HTML", iconClass: "text-orange-500" },
    { name: "CSS", iconText: "CSS", iconClass: "text-blue-500" },
    { name: "Python", iconText: "Py", iconClass: "text-green-500" },
    { name: "React", iconText: "Re", iconClass: "text-blue-400" },
    { name: "Node.js", iconText: "Node", iconClass: "text-green-600" },
    { name: "Git", iconText: "Git", iconClass: "text-orange-600" },
    { name: "MongoDB", iconText: "DB", iconClass: "text-green-500" },
    { name: "Tailwind", iconText: "TW", iconClass: "text-cyan-500" },
    { name: "TypeScript", iconText: "TS", iconClass: "text-blue-600" },
    { name: "Figma", iconText: "Fig", iconClass: "text-purple-500" },
  ];
}
