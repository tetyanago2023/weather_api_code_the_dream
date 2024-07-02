// Description: This file contains the tests for the script.js file.
const { toggleTheme } = require('./script');

describe('Weather App Tests', () => {
    let mockDocumentBody;

    beforeEach(() => {
        mockDocumentBody = document.body;
        document.body.classList.remove('night-mode');
        localStorage.clear();
    });

    test('Toggle Theme Test', () => {
        // Mock themeIcon element
        const themeIcon = document.createElement('i');
        themeIcon.id = 'theme-icon';
        document.body.appendChild(themeIcon);

        // Simulate toggling theme to night mode
        toggleTheme();

        // Assert classList toggling and localStorage update
        expect(document.body.classList.contains('night-mode')).toBe(true);
        expect(localStorage.getItem('theme')).toBe('night-mode');
        expect(themeIcon.className).toBe('wi wi-day-sunny');

        // Simulate toggling theme back to day mode
        toggleTheme();

        // Assert classList toggling and localStorage update
        expect(document.body.classList.contains('night-mode')).toBe(false);
        expect(localStorage.getItem('theme')).toBe('day-mode');
        expect(themeIcon.className).toBe('wi wi-night-clear');
    });
});
