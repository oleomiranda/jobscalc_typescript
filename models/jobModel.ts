import { Sequelize, Model, DataTypes, Association, BelongsToSetAssociationMixin } from "sequelize";
import user from "./userModel";


class job extends Model {
	name!: string;
	dailyHours!: number;
	totalHours!: number;
	createdAt!: number;
	timeInDays!: number;
	dueDay!: number;

	public static initialize(sequelize: Sequelize){
		this.init({
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			dailyHours: {
				type: DataTypes.STRING,
				allowNull: false
			},
			totalHours:{
				type: DataTypes.STRING,
				allowNull: false
			},
			createdAt:{
				type: DataTypes.DECIMAL(38),
				allowNull: false
			},
			timeInDays:{
				type: DataTypes.DECIMAL(38),
				allowNull: false
			},
			dueDay:{
				type: DataTypes.DECIMAL(38),
				allowNull: false
			},
			done:{
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		}, {sequelize, freezeTableName: true, timestamps: false})
	}

}




export default job