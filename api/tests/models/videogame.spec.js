const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	describe('Validators', () => {
		beforeEach(() => Videogame.sync({ force: true }));
		describe('name', () => {
			it('should throw an error if name is null', (done) => {
				Videogame.create({})
					.then(() => done(new Error('It requires a valid name')))
					.catch(() => done());
			});
			it('should work when its a valid name', () => {
				Videogame.create({ name: 'Super Mario Bros' });
			});
		});
		describe('description', () => {
			it('should throw an error if name is null', (done) => {
				Videogame.create({ name: 'Super Mario Bros' })
					.then(() => done(new Error('It requires a valid description')))
					.catch(() => done());
			});
			it('should work when its a valid description', () => {
				Videogame.create({
					name: 'Super Mario Bros',
					description: 'test description',
				});
			});
		});
		describe('platforms', () => {
			it('should throw an error if platforms is null', (done) => {
				Videogame.create({
					name: 'Super Mario Bros',
					description: 'test description',
				})
					.then(() => done(new Error('It requires at least 1 platform')))
					.catch(() => done());
			});
			it('should work when it has at least 1 platform', () => {
				Videogame.create({
					name: 'Super Mario Bros',
					description: 'test description',
					platforms: ['Playstation', 'Pc'],
				});
			});
		});
	});
});
