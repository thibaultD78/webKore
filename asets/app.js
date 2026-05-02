var layer2deb = false;
var layer3deb = false;
var layer4deb = false;
var layer5deb = false;

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

async function hashPassword(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkAccess(pageUrl, correctHash,numLayer) {
    if (correctHash === 'libre') {
        window.location.href = pageUrl;
        return;
    }
    const isUnlocked = localStorage.getItem('unlocked_layer_' + numLayer);

    if (isUnlocked === "true") {
        window.location.href = pageUrl;
        return;
    }

    const userInput = prompt("Ce Layer est protégé. Mot de passe :");
    
    if (userInput) {
        const hashedInput = await hashPassword(userInput);
        
        if (hashedInput === correctHash) {
            localStorage.setItem('unlocked_layer_' + numLayer, "true");
            window.location.href = pageUrl;
        } else {
            alert("Accès refusé !");
        }
    }
}