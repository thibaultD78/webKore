
// --- Navigation contextuelle : Défilement vers une section (ScrollTo) ---

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' }); // Défilement fluide
    }
}