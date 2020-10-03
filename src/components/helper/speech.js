export const say = (text) => {
    var tts = window.speechSynthesis;
    var utter = new SpeechSynthesisUtterance(text);
    tts.speak(utter)
};   

export const pause = () => {
    var tts = window.speechSynthesis;
    console.log("true");
    tts.cancel();
}
export const resume = () => {
    var tts = window.speechSynthesis;
    tts.resume();
}


