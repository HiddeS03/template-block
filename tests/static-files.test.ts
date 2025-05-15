import { describe, expect, it } from 'vitest';
import * as fs from 'file-system';
import * as path from 'path';
import * as yaml from 'js-yaml';

const publicDir = path.join(__dirname, '../public');

function validateYamlFile(filePath: string): any {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.load(content);
  } catch (error) {
    throw new Error(`Invalid YAML in ${path.basename(filePath)}: ${error.message}`);
  }
}

describe('Static files validation', () => {
  it('should have valid defaultconfig.yaml structure', () => {
    const configPath = path.join(publicDir, 'defaultconfig.yaml');
    const config = validateYamlFile(configPath);

    expect(config).toHaveProperty('version');
    expect(typeof config.version).toBe('string');
    expect(config).toHaveProperty('text');
    expect(config.text).toHaveProperty('content');
    expect(typeof config.text.content).toBe('string');
  });

  it('should have valid form.yaml structure', () => {
    const formPath = path.join(publicDir, 'form.yaml');
    const form = validateYamlFile(formPath);

    expect(form).toHaveProperty('form.fields');
    expect(Array.isArray(form.form.fields)).toBe(true);
    
    const field = form.form.fields[0];
    expect(field).toHaveProperty('name');
    expect(field).toHaveProperty('type');
    expect(field).toHaveProperty('label');
    expect(typeof field.name).toBe('string');
    expect(typeof field.type).toBe('string');
    expect(typeof field.label).toBe('string');
  });

  it('should have icon.svg file', () => {
    const iconPath = path.join(publicDir, 'icon.svg');
    expect(fs.existsSync(iconPath)).toBe(true);
  });

  it('should have valid manifest.yaml structure', () => {
    const manifestPath = path.join(publicDir, 'manifest.yaml');
    const manifest = validateYamlFile(manifestPath);

    const requiredFields = ['id', 'name', 'author', 'category', 'description', 'icon', 'version'];
    requiredFields.forEach(field => {
      expect(manifest).toHaveProperty(field);
      expect(typeof manifest[field]).toBe('string');
    });
  });

  it('should have consistent references between files', () => {
    const formPath = path.join(publicDir, 'form.yaml');
    const configPath = path.join(publicDir, 'defaultconfig.yaml');
    
    const form = validateYamlFile(formPath);
    const config = validateYamlFile(configPath);

    const fieldName = form.form.fields[0].name;
    const [objName, propName] = fieldName.split('.');
    expect(config).toHaveProperty(objName);
    expect(config[objName]).toHaveProperty(propName);
  });
});