import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { projects } from './src/data/projects';
import { skillCategories } from './src/data/skills';
import { personal } from './src/data/personal';
import { journey } from './src/data/journey';

const contentDir = path.join(__dirname, 'src', 'content');

// Create directories
fs.mkdirSync(path.join(contentDir, 'projects'), { recursive: true });
fs.mkdirSync(path.join(contentDir, 'journey'), { recursive: true });

// Migrate Projects
for (const proj of projects) {
  const { id, ...rest } = proj;
  const filePath = path.join(contentDir, 'projects', `${id}.yaml`);
  fs.writeFileSync(filePath, yaml.stringify(rest));
}

// Migrate Skills
fs.writeFileSync(
  path.join(contentDir, 'skills.yaml'),
  yaml.stringify({ categories: skillCategories })
);

// Migrate Personal
fs.writeFileSync(
  path.join(contentDir, 'personal.yaml'),
  yaml.stringify(personal)
);

// Migrate Journey
for (let i = 0; i < journey.length; i++) {
  const item = journey[i];
  const slug = `journey-${item.year}-${i}`;
  const filePath = path.join(contentDir, 'journey', `${slug}.yaml`);
  fs.writeFileSync(filePath, yaml.stringify(item));
}

// Ensure journey sequence in singleton
fs.writeFileSync(
  path.join(contentDir, 'journey.yaml'),
  yaml.stringify({ items: journey })
);

console.log('Migration complete!');
