const Print = () => {
    document.title = document.getElementById('batch').value
    window.print()
}

module.exports = Print;