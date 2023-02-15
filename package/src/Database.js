const fs = require('node:fs');
const path = require('node:path');

const Base = require('./Base');

class Database extends Base {
	constructor(keys) {
		super(keys);
	}

	findKey = (key) => {
		const res = this.database[key];

		if (res === undefined) throw new Error(`Key '${key}' not found`);

		return [key, res];
	};

	findById = (key, _id, first = true) => {
		const group = this.findKey(key)[1];

		if (first) {
			return group.find((item) => item._id === _id);
		}

		const res = group.filter((item) => item._id === _id);

		return res.length ? res : undefined;
	};

	add = (key, obj) => {
		const group = this.findKey(key);

		if (!obj?._id) throw new Error(`Parameter 'id' is required`);

		this._addToDatabase(key, obj);

		return this.database[key];
	};

	remove = (key, obj) => {
		const group = this.findKey(key);

		if (!obj?._id) throw new Error(`Parameter 'id' is required`);

		this._removeFromDatabase(key, obj);

		return this.database[key];
	};

	update = (key, query, obj) => {
		const group = this.findKey(key);

		if (!query?._id) throw new Error(`Parameter 'id' is required`);

		this._updateDatabase(key, query, obj);

		return this.database[key];
	};
}

module.exports = Database;
