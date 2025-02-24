import { Bank } from './bank.entity.js';

describe('Bank', () => {
	let bank = new Bank();

	beforeEach(() => {
		bank = new Bank();
	});

	describe('ujSzamla', () => {
		it('should create a new account with a balance of 0', () => {
			bank.ujSzamla('John Doe', '12345678');
			const account = bank.szamlak[0];
			expect(account.nev).toBe('John Doe');
			expect(account.szamlaszam).toBe('12345678');
			expect(account.egyenleg).toBe(0);
		});

		it('should throw an error if the arguments are invalid', () => {
			expect(() => bank.ujSzamla()).toThrow();
			expect(() => bank.ujSzamla(null, null)).toThrow();
			expect(() => bank.ujSzamla('John Doe', undefined)).toThrow();
			expect(() => bank.ujSzamla('John Doe', null)).toThrow();
			expect(() => bank.ujSzamla(null, '12345678')).toThrow();
			expect(() => bank.ujSzamla(undefined, '12345678')).toThrow();
		});

		it('should throw an error if the account number already exists', () => {
			bank.ujSzamla('John Doe', '12345678');
			expect(() => bank.ujSzamla('Jane Doe', '12345678')).toThrow();
			expect(() => bank.ujSzamla('Jane Doe', '12345678')).toThrow();
		});

		it("should not throw an error if the account holder's name already exists", () => {
			bank.ujSzamla('John Doe', '12345678');
			expect(() => bank.ujSzamla('John Doe', '87654321')).not.toThrow();
		});
	});

	describe('egyenleg', () => {
		it('should return the balance of the given account number', () => {
			bank.ujSzamla('John Doe', '12345678');
			bank.ujSzamla('Jane Doe', '87654321');
			expect(bank.egyenleg('12345678')).toBe(0);
			expect(bank.egyenleg('87654321')).toBe(0);
		});

		it('should throw an error if the account number is invalid', () => {
			expect(() => bank.egyenleg()).toThrow();
			expect(() => bank.egyenleg(null)).toThrow();
			expect(() => bank.egyenleg(undefined)).toThrow();
			expect(() => bank.egyenleg('')).toThrow();
		});

		it('should throw an error if the account number does not exist', () => {
			bank.ujSzamla('John Doe', '12345678');
			expect(() => bank.egyenleg('87654321')).toThrow();
		});
	});

	describe('egyenlegFeltolt', () => {
		it('should add the given amount of money to the given account number', () => {
			bank.ujSzamla('John Doe', '12345678');
			bank.ujSzamla('Jane Doe', '87654321');
			bank.egyenlegFeltolt('12345678', 1000);
			bank.egyenlegFeltolt('87654321', 2000);
			expect(bank.egyenleg('12345678')).toBe(1000);
			expect(bank.egyenleg('87654321')).toBe(2000);
		});

		it('should throw an error if the account number is invalid', () => {
			expect(() => bank.egyenlegFeltolt()).toThrow();
			expect(() => bank.egyenlegFeltolt(null)).toThrow();
			expect(() => bank.egyenlegFeltolt(undefined)).toThrow();
			expect(() => bank.egyenlegFeltolt('')).toThrow();
		});

		it('should throw an error if the account number does not exist', () => {
			bank.ujSzamla('John Doe', '12345678');
			expect(() => bank.egyenlegFeltolt('87654321', 1000)).toThrow();
		});

		it('should throw an error if the amount is invalid', () => {
			bank.ujSzamla('John Doe', '12345678');
			expect(() => bank.egyenlegFeltolt('12345678')).toThrow();
			expect(() => bank.egyenlegFeltolt('12345678', null)).toThrow();
			expect(() => bank.egyenlegFeltolt('12345678', undefined)).toThrow();
			expect(() => bank.egyenlegFeltolt('12345678', -1000)).toThrow();
			expect(() => bank.egyenlegFeltolt('12345678', 0)).toThrow();
			expect(() => bank.egyenlegFeltolt('12345678', 0.5)).toThrow();
		});
	});

	describe('utal', () => {
		it('should transfer the given amount of money from one account to another', () => {
			bank.ujSzamla('John Doe', '12345678');
			bank.ujSzamla('Jane Doe', '87654321');
			bank.egyenlegFeltolt('12345678', 1000);
			bank.egyenlegFeltolt('87654321', 2000);
			expect(bank.utal('12345678', '87654321', 500)).toBe(true);
			expect(bank.egyenleg('12345678')).toBe(500);
			expect(bank.egyenleg('87654321')).toBe(2500);
		});

		it('should return false if the source account does not have enough money', () => {
			bank.ujSzamla('John Doe', '12345678');
			bank.ujSzamla('Jane Doe', '87654321');
			bank.egyenlegFeltolt('12345678', 1000);
			bank.egyenlegFeltolt('87654321', 2000);
			expect(bank.utal('12345678', '87654321', 1500)).toBe(false);
			expect(bank.egyenleg('12345678')).toBe(1000);
			expect(bank.egyenleg('87654321')).toBe(2000);
		});

		it('should throw an error if the source account number is invalid', () => {
			expect(() => bank.utal()).toThrow();
			expect(() => bank.utal(null)).toThrow();
			expect(() => bank.utal(undefined)).toThrow();
			expect(() => bank.utal('')).toThrow();
		});

		it('should throw an error if the source account number does not exist', () => {
			bank.ujSzamla('John Doe', '12345678');
			expect(() => bank.utal('87654321', '12345678', 1000)).toThrow();
		});

		it('should throw an error if the target account number is invalid', () => {
			expect(() => bank.utal('12345678')).toThrow();
			expect(() => bank.utal('12345678', null)).toThrow();
			expect(() => bank.utal('12345678', undefined)).toThrow();
			expect(() => bank.utal('12345678', '')).toThrow();
		});

		it('should throw an error if the target account number does not exist', () => {
			bank.ujSzamla('John Doe', '12345678');
			bank.egyenlegFeltolt('12345678', 1000);
			expect(() => bank.utal('12345678', '87654321', 1000)).toThrow();
		});

		it('should throw an error if the source and target account numbers are the same', () => {
			bank.ujSzamla('John Doe', '12345678');
			bank.egyenlegFeltolt('12345678', 1000);
			expect(() => bank.utal('12345678', '12345678', 1000)).toThrow();
		});

		it('should throw an error if the amount is invalid', () => {
			bank.ujSzamla('John Doe', '12345678');
			bank.ujSzamla('Jane Doe', '87654321');
			bank.egyenlegFeltolt('12345678', 1000);
			bank.egyenlegFeltolt('87654321', 2000);
			expect(() => bank.utal('12345678', '87654321')).toThrow();
			expect(() => bank.utal('12345678', '87654321', null)).toThrow();
			expect(() => bank.utal('12345678', '87654321', undefined)).toThrow();
			expect(() => bank.utal('12345678', '87654321', -1000)).toThrow();
			expect(() => bank.utal('12345678', '87654321', 0)).toThrow();
			expect(() => bank.utal('12345678', '87654321', 0.5)).toThrow();
		});
	});
});
