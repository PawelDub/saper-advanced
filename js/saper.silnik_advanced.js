function Saper(pola, licznik, licznikBomb) {
    this.pola = pola;
    this.licznik = licznik;
    this.licznikBomb = licznikBomb;
    this.stanBomb = 0;
    this.minutnik = null;
    this.status = false;
    this.level = 'Beginner';
    this.lastRowNumber;
};

function random(min, max) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    if (min > max) {
        var tmp = min;
        min = max;
        max = tmp;
    };
    return Math.floor(Math.random() * ( max - min + 1 ) + min);
};

// beginner = 9 ; middle = 49 ; expert = 99
Saper.prototype.zaminuj = function (iloscMin, zakres) {
    var miny = [];
    while (miny.length < iloscMin) {
        var mina = random(0, zakres - 1);
        if (miny.includes(mina)) continue;
        miny.push(mina);
        this.pola[mina].innerText = '*';
        this.pola[mina].setAttribute('mina', true);
    };
};

Saper.prototype.podpowiedzi = function () {

    for (var pole = 0; pole < this.pola.length; pole++) {
        if (this.pola[pole].innerText === '*') continue;

        var counter = 0;

        if (this.level === 'Beginner') {
            var leftUp = ((pole > 9) && (pole % 10 !== 0) && (this.pola[pole - 11].innerText === '*'));
            var up = ((pole > 9) && (this.pola[pole - 10].innerText === '*'));
            var rightUp = ((pole > 9) && ((pole - 9) % 10 !== 0) && (this.pola[pole - 9].innerText === '*'));
            var left = ((pole % 10 !== 0) && (this.pola[pole - 1].innerText === '*'));
            var right = (pole - 9) % 10 !== 0 && this.pola[pole + 1].innerText === '*';
            var leftDown = ((pole < 90) && (pole % 10 !== 0) && (this.pola[pole + 9].innerText === '*'));
            var down = ((pole < 90) && (this.pola[pole + 10].innerText === '*'));
            var rightDown = ((pole < 90) && ((pole - 9) % 10 !== 0) && (this.pola[pole + 11].innerText === '*'));

            if (leftUp) counter++;
            if (up) counter++;
            if (rightUp) counter++;
            if (left) counter++;
            if (right) counter++;
            if (leftDown) counter++;
            if (down) counter++;
            if (rightDown) counter++;

        } else if (this.level === 'Middle') {

            var leftUp = ((pole > 15) && (pole % 16 !== 0) && (this.pola[pole - 17].innerText === '*'));
            var up = ((pole > 15) && (this.pola[pole - 16].innerText === '*'));
            var rightUp = ((pole > 15) && ((pole - 15) % 16 !== 0) && (this.pola[pole - 15].innerText === '*'));
            var left = ((pole % 16 !== 0) && (this.pola[pole - 1].innerText === '*'));
            var right = (pole - 15) % 16 !== 0 && this.pola[pole + 1].innerText === '*';
            var leftDown = ((pole < 464) && (pole % 16 !== 0) && (this.pola[pole + 15].innerText === '*'));
            var down = ((pole < 464) && (this.pola[pole + 16].innerText === '*'));
            var rightDown = ((pole < 464) && ((pole - 15) % 16 !== 0) && (this.pola[pole + 17].innerText === '*'));

            if (leftUp) counter++;
            if (up) counter++;
            if (rightUp) counter++;
            if (left) counter++;
            if (right) counter++;
            if (leftDown) counter++;
            if (down) counter++;
            if (rightDown) counter++;

        } else if (this.level === 'Expert') {

            var leftUp = ((pole > 29) && (pole % 30 !== 0) && (this.pola[pole - 31].innerText === '*'));
            var up = ((pole > 29) && (this.pola[pole - 30].innerText === '*'));
            var rightUp = ((pole > 29) && ((pole - 29) % 30 !== 0) && (this.pola[pole - 29].innerText === '*'));
            var left = ((pole % 30 !== 0) && (this.pola[pole - 1].innerText === '*'));
            var right = (pole - 29) % 30 !== 0 && this.pola[pole + 1].innerText === '*';
            var leftDown = ((pole < 870) && (pole % 30 !== 0) && (this.pola[pole + 29].innerText === '*'));
            var down = ((pole < 870) && (this.pola[pole + 30].innerText === '*'));
            var rightDown = ((pole < 870) && ((pole - 29) % 30 !== 0) && (this.pola[pole + 31].innerText === '*'));

            if (leftUp) counter++;
            if (up) counter++;
            if (rightUp) counter++;
            if (left) counter++;
            if (right) counter++;
            if (leftDown) counter++;
            if (down) counter++;
            if (rightDown) counter++;

        };

        if (counter > 0) {
            this.pola[pole].innerText = counter;
        };
    };
};

//begginer: lastRowNumber = 9, middle: lastRowNumber = 15, expert lastRowNumber = 29
Saper.prototype.odkryj = function (x, y) {
    if (x < 0 || x > this.lastRowNumber || y < 0 || y > this.lastRowNumber) return;
    var pole = $('tr[y="' + y + '"] td[x="' + x + '"]')
    if (pole.hasClass('widoczny')) return;
    if (pole.html() * 1 > 0) {
        if(pole.hasClass('flaga')) {
            $(this).removeClass('flaga');
            self.stanBomb = --self.stanBomb;
            self.licznikBomb.text(self.stanBomb + iloscBomb);
        }
        pole.addClass('widoczny');
        return;
    }
    if (!pole.html()) {
        if(pole.hasClass('flaga')) {
            $(this).removeClass('flaga');
            self.stanBomb = --self.stanBomb;
            self.licznikBomb.text(self.stanBomb + iloscBomb);
        }
        pole.addClass('widoczny');
    }
    this.odkryj(x - 1, y - 1);
    this.odkryj(x, y - 1);
    this.odkryj(x + 1, y - 1);
    this.odkryj(x - 1, y);
    this.odkryj(x + 1, y);
    this.odkryj(x - 1, y + 1);
    this.odkryj(x, y + 1);
    this.odkryj(x + 1, y + 1);
};

Saper.prototype.czas = function () {
    if (this.minutnik) {
        clearInterval(this.minutnik)
    }
    var self = this;
    var poczatek = 0;
    self.licznik.text('0');
    this.minutnik = setInterval(function () {
        self.licznik.text(++poczatek);
    }, 1000);
};

Saper.prototype.czasStop = function () {
    clearInterval(this.minutnik);
    this.licznik.text('0');
};

Saper.prototype.blad = function (pole) {
    pole.addClass('blad');
    this.pola.addClass('widoczny');
    clearInterval(this.minutnik);
    this.status = false;
};

Saper.prototype.wygrana = function () {
    clearInterval(this.minutnik);
    alert('Brawo! wygrałeś w ' + this.licznik.text() + ' s!');
    this.pola.addClass('widoczny');
    this.status = false;
};

Saper.prototype.stop = function () {
    this.czasStop();
    this.pola.text('');
    this.pola.removeAttr('mina');
    this.pola.removeAttr('blad');
    this.pola.removeClass('widoczny');
    this.pola.removeClass('flaga');
    this.stanBomb = 0;
    this.minutnik = null;
    this.status = false;
    if (this.level == 'Beginner') {
        this.licznikBomb.text('0 / 10');
    } else if (this.level == 'Middle') {
        this.licznikBomb.text('0 / 49');
    } else if (this.level == 'Expert') {
        this.licznikBomb.text('0 / 99');
    }
};

Saper.prototype.uruchom = function () {
    var self = this;
    this.status = true;
    this.pola.text('');
    this.stanBomb = 0;
    this.pola.removeAttr('mina');
    this.pola.removeAttr('blad');
    this.pola.removeClass('widoczny');
    this.pola.removeClass('flaga');
    this.czas();

    var maxLength;
    var iloscBomb;
    var maxStanBomb;
    if (this.level === 'Beginner') {
        maxStanBomb = 10;
        this.licznikBomb.text('0 / 10');
        this.zaminuj(maxStanBomb, 100);
        maxLength = 89;
        iloscBomb = ' / 10';
        this.lastRowNumber = 9;
    } else if (this.level === 'Middle') {
        maxStanBomb = 49;
        this.licznikBomb.text('0 / 49');
        this.zaminuj(maxStanBomb, 480);
        maxLength = 473;
        iloscBomb = ' / 49';
        this.lastRowNumber = 29;
    } else if (this.level === 'Expert') {
        maxStanBomb = 99;
        this.licznikBomb.text('0 / 99');
        this.zaminuj(maxStanBomb, 900);
        maxLength = 869;
        iloscBomb = ' / 99';
        this.lastRowNumber = 29;
    }

    this.podpowiedzi();

    this.pola.on('click', function () {
        if (self.status) {
            var pole = $(this);
            var x = pole.attr('x') * 1;
            var y = pole.parent().attr('y') * 1;
            if (pole.text() != '*') {
                self.odkryj(x, y);
                if (self.pola.filter('.widoczny').length > maxLength) {
                    self.wygrana();
                }
            } else {
                if(pole.hasClass('flaga')) return;
                self.blad(pole);
            }
        }
    });

    this.pola.on('contextmenu', function (event) {
        if (self.status) {
            if(!($(this).hasClass('widoczny'))) {

                if ($(this).hasClass('flaga')) {
                    $(this).removeClass('flaga');
                    self.stanBomb = --self.stanBomb;
                } else {
                    if(self.stanBomb > maxStanBomb - 1){
                     alert('Oznakowałeś maksymalną ilość bomb')
                    } else {
                        $(this).addClass('flaga')
                        self.stanBomb = ++self.stanBomb;
                    }
                }
            }
            self.licznikBomb.text(self.stanBomb + iloscBomb);
        }
    });
};

var headAndFooter = function (td) {
    var colspanFirstAndLast = (td-2)/2;
    $('table thead tr th:eq( 0 )').attr('colspan', colspanFirstAndLast);
    $('table thead tr th:eq( 2 )').attr('colspan', colspanFirstAndLast);
    $('table tfoot tr td:eq( 0 )').attr('colspan', colspanFirstAndLast);
    $('table tfoot tr td:eq( 2 )').attr('colspan', colspanFirstAndLast);
    $('table tfoot tr:eq( 1 ) td').attr('colspan', td);

};

var setGame = function (tr, td) {
    for (var i = 0; i < tr; i++) {
        $('tbody').append('<tr y="' + i + '"></tr>');
    }
    for (var j = 0; j < td; j++) {
        $('tbody tr').append('<td x="' + j + '"></td>');
    }
    headAndFooter(td);
};

var choseGame = function (level) {
    saper.level = level;
    switch (level) {
        case 'Beginner':
            $('tbody tr').remove();
            setGame(10, 10);
            break;
        case 'Middle':
            $('tbody tr').remove();
            setGame(30, 16);
            break;
        case 'Expert':
            $('tbody tr').remove();
            setGame(30, 30);
            break;
        default:
            $('tbody tr').remove();
            setGame(10, 10);
    }
};

var stopGame = function () {
    $('.stop').on('click', function () {
        saper.stop();
    });
};

var startGamme = function () {
    $('.start').on('click', function () {
        saper.pola = $('tbody td');
        saper.uruchom();
    });
};