const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('videogame', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		background_image: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		release_date: {
			type: DataTypes.STRING,
		},
		rating: {
			type: DataTypes.FLOAT,
		},
		platforms: {
			type: DataTypes.STRING,
			allowNull: false,
			get() {
				return this.getDataValue('platforms').split(', ');
			},
			set(val) {
				this.setDataValue('platforms', val.join(', '));
			},
		},
	});
};
