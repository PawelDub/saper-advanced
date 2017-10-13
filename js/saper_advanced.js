// Tutaj wykonujemy zadanie :)

$(document).ready(function () {
    $('*').on('contextmenu', function (contextmenuEvent) {
        contextmenuEvent.preventDefault();
    });


    saper = new Saper($('tbody td'), $('.licznik'), $('.licznikBomb'));
    choseGame('Beginner');

    stopGame();
    startGamme();

    $('#saperGame').on('change', function () {
        saper.level = $("#saperGame option:selected").text();
        choseGame(saper.level);
        saper.stop();
    });
});