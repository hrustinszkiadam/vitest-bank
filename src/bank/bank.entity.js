/**
 * Egy bankszámlát reprezentáló osztály.
 */
export class Szamla {
	/**
	 * Létrehoz egy új bankszámlát a megadott névvel, számlaszámmal és 0 Ft egyenleggel.
	 * @param {string} nev A számla tulajdonosának neve. Nem lehet üres.
	 * @param {string} szamlaszam A számla számlaszáma. Nem lehet  üres.
	 * @throws {Error} Ha a név vagy a számlaszám üres.
	 */
	constructor(nev, szamlaszam) {
		if (!nev || nev === '') {
			throw new Error('A név nem lehet üres');
		}
		if (!szamlaszam || szamlaszam === '') {
			throw new Error('A számlaszám nem lehet üres');
		}
		this.nev = nev;
		this.szamlaszam = szamlaszam;
		this.egyenleg = 0;
	}
}

/**
 * Bank műveleteit végrehajtó osztály.
 */
export class Bank {
	constructor() {
		this.szamlak = [];
	}

	/**
	 * Új számlát nyit a megadott névvel, számlaszámmal, 0 Ft egyenleggel
	 * @param {string} nev A számla tulajdonosának neve. Nem lehet null, nem lehet üres.
	 * @param {string} szamlaszam A számla számlaszáma. Nem lehet null, nem lehet üres, egyedinek kell lennie.
	 * @throws {Error} Ha a számlaszám már létezik.
	 */
	ujSzamla(nev, szamlaszam) {
		if (this.szamlak.find((s) => s.szamlaszam === szamlaszam)) {
			throw new Error('A számlaszám már létezik');
		}
		this.szamlak.push(new Szamla(nev, szamlaszam));
	}

	/**
	 * Lekérdezi az adott számlán lévő pénzösszeget
	 * @param {string} szamlaszam A számla számlaszáma, aminek az egyenlegét keressük. Nem lehet null, nem lehet üres, léteznie kell.
	 * @returns {number} A számlán lévő egyenleg
	 * @throws {Error} Ha a megadott számlaszám üres.
	 * @throws {Error} Ha a számlaszám nem létezik.
	 */
	egyenleg(szamlaszam) {
		if (!szamlaszam || szamlaszam === '') {
			throw new Error('A számlaszám nem lehet üres');
		}
		const szamla = this.szamlak.find((s) => s.szamlaszam === szamlaszam);
		if (!szamla) {
			throw new Error('A számlaszám nem létezik');
		}
		return szamla.egyenleg;
	}

	/**
	 * Egy létező számlára pénzt helyez
	 * @param {string} szamlaszam A számla számlaszáma, amire pénzt helyez. Nem lehet null, nem lehet üres, léteznie kell.
	 * @param {number} osszeg A számlára helyezendő pénzösszeg. Csak pozitív egész szám lehet.
	 */
	egyenlegFeltolt(szamlaszam, osszeg) {
		throw new Error('Not implemented');
	}

	/**
	 * Átutalja a megadott összeget egyik számláról a másikra. Ha a forrás számlán nincs elég összeg, akkor nem történik utalás.
	 * @param {string} honnan A forrás számla számlaszáma. Nem lehet null, nem lehet üres, léteznie kell.
	 * @param {string} hova A cél számla számlaszáma. Nem lehet null, nem lehet üres, léteznie kell.
	 * @param {number} osszeg Az átutalandó egyenleg. Csak pozitív egész szám lehet.
	 * @returns {boolean} Az utalás sikeressége. True ha volt elég összeg a forrás számlán, különben false.
	 */
	utal(honnan, hova, osszeg) {
		throw new Error('Not implemented');
	}
}
