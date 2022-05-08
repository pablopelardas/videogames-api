const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('videogame', {
		uid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		launch_date: {
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
