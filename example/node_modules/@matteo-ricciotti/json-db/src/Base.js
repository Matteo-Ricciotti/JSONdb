const fs = require('node:fs');
const path = require('node:path');

class Base {
	constructor(keys) {
		this.keys = keys;

		if (typeof keys === 'string') this.keys = [keys];

		this.database = this.#getDatabase();

		this.#createDatabase();
	}

	#createDatabase = () => {
		for (const key of this.keys) {
			if (this.database.hasOwnProperty(key)) continue;

			this.#addKey(key);
		}
	};

	#addKey = (key) => {
		Object.assign(this.database, { [key]: [] });

		fs.writeFileSync(path.join(__dirname, './database.json'), JSON.stringify(this.database));
	};

	#getDatabase = () => {
		return JSON.parse(fs.readFileSync(path.join(__dirname, './database.json'), 'utf8'));
	};

	_addToDatabase = (key, obj) => {
		const newDatabase = this.database;

		newDatabase[key].push(obj);

		fs.writeFileSync(path.join(__dirname, './database.json'), JSON.stringify(newDatabase));
	};

	_removeFromDatabase = (key, obj) => {
		const newDatabase = this.database;
		const indexOfGroup = newDatabase[key].findIndex((g) => g._id === obj._id);

		if (indexOfGroup === -1) return;

		newDatabase[key].splice(indexOfGroup, 1);

		fs.writeFileSync(path.join(__dirname, './database.json'), JSON.stringify(newDatabase));
	};

	_updateDatabase = (key, query, obj) => {
		const newDatabase = this.database;
		const indexOfGroup = newDatabase[key].findIndex((g) => g._id === query._id);

		if (indexOfGroup === -1) return;

		newDatabase[key][indexOfGroup] = { ...query, ...obj };

		fs.writeFileSync(path.join(__dirname, './database.json'), JSON.stringify(newDatabase));
	};
}

module.exports = Base;
