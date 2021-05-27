const SecondsToMinutes = (time) => {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return { minutes: minutes, seconds: seconds }
}

module.exports = SecondsToMinutes;