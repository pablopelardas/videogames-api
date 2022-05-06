const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('videogame', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
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
			type: DataTypes.DATEONLY,
		},
		rating: {
			type: DataTypes.FLOAT,
		},
		platforms: {
			type: DataTypes.STRING,
			allowNull: false,
			get() {
				return this.getDataValue('favColors').split(';');
			},
			set(val) {
				this.setDataValue('favColors', val.join(';'));
			},
		},
	});
};
