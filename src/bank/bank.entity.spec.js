import { Bank } from './bank.entity.js';
import { it, describe, expect, beforeEach } from 'vitest';

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
	});
});
