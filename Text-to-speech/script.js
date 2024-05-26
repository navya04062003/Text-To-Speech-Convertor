document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const convertButton = document.getElementById('convert-button');
    const languageSelect = document.getElementById('language-select');
    const voiceSelect = document.getElementById('voice-select');

    const languageMap = {
        'en-US': 'English (United States)',
        'en-GB': 'English (United Kingdom)',
        'es-ES': 'Spanish (Spain)',
        'fr-FR': 'French (France)',
        'de-DE': 'German (Germany)',
        'it-IT': 'Italian (Italy)',
        'ja-JP': 'Japanese (Japan)',
        'ko-KR': 'Korean (Korea)',
        'zh-CN': 'Chinese (China)',
        'hi-IN': 'Hindi (India)',
        'bn-IN': 'Bengali (India)',
        'te-IN': 'Telugu (India)',
        'ta-IN': 'Tamil (India)',
        'gu-IN': 'Gujarati (India)',
        'ml-IN': 'Malayalam (India)',
        'kn-IN': 'Kannada (India)', // Added Kannada
        // Add more languages as needed
    };

    let voices = [];

    const loadVoices = () => {
        voices = window.speechSynthesis.getVoices();

        const languages = [...new Set(voices.map(voice => voice.lang))];
        languageSelect.innerHTML = languages.map(lang => `<option value="${lang}">${languageMap[lang] || lang}</option>`).join('');
        loadVoicesForSelectedLanguage();
    };

    const loadVoicesForSelectedLanguage = () => {
        const selectedLanguage = languageSelect.value;
        const filteredVoices = voices.filter(voice => voice.lang === selectedLanguage);
        voiceSelect.innerHTML = filteredVoices.map(voice => `<option value="${voice.name}">${voice.name}</option>`).join('');
    };

    languageSelect.addEventListener('change', loadVoicesForSelectedLanguage);

    convertButton.addEventListener('click', () => {
        const text = textInput.value;
        const selectedVoiceName = voiceSelect.value;
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);

        console.log('Selected voice:', selectedVoice); // Debugging: Log selected voice details

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        // Set some properties for the speech
        utterance.rate = 1;  // Speed (0.1 to 10)
        utterance.pitch = 1; // Pitch (0 to 2)
        utterance.volume = 1; // Volume (0 to 1)

        window.speechSynthesis.speak(utterance);
    });

    window.speechSynthesis.onvoiceschanged = loadVoices;
});
