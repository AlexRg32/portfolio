# Plan: Refactor GitHub Links

The goal is to remove individual GitHub links from projects in the portfolio and replace them with a general call-to-action to visit my GitHub profile.

## Tasks

### 1. Investigation & Design

- [x] Identify locations of individual GitHub links in `ProjectCard.jsx`.
- [x] Locate general GitHub profile link in `profile.js`.
- [x] Design a new call-to-action for the general GitHub link in the `Projects` section.

### 2. Implementation

- [x] Modify `src/components/ProjectCard.jsx` to remove individual GitHub links.
- [x] Modify `src/sections/Projects.jsx` to add a general GitHub call-to-action at the bottom of the section.
- [x] Update `src/data/projects.js` to remove `githubLink` properties.

### 3. Verification

- [x] Ensure all individual project cards only show the live site link.
- [x] Verify the new general GitHub link is visible and functional.
