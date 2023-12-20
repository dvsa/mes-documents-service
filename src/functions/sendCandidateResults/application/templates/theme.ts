export const themeTemplate = `
# Lesson and Lesson Theme
Student – {{studentLevel}}

Theme(s):
  {{#each lessonThemes}}
  - {{ this }}
  {{/each}}
`;
