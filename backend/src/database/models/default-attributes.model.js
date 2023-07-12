const config = require("../../config/database-schema");

module.exports = function (sequelize, DataTypes) {
    const defaultAttributes = sequelize.define(
        config.DEFAULT_ATTRIBUTES,
        {
            id: {
                type: DataTypes.UUID,
                field: "id",
                primaryKey: true,
                unique: true,
                defaultValue: DataTypes.UUIDV4
            },
            integrationId: {
                type: DataTypes.STRING,
                field: "integration_id"
            },
            name: {
                type: DataTypes.STRING,
                field: "name",
                allowNull: false
            },
            rank: {
                type: DataTypes.STRING,
                field: "rank"
            },
            type: {
                type: DataTypes.STRING,
                field: "type"
            },
            validation: {
                type: DataTypes.STRING,
                field: "validation"
            },
            isActive: {
                type: DataTypes.ENUM,
                field: "is_active",
                values: ["0", "1"],
                allowNull: false,
                defaultValue: "1"
            },
            createdBy: {
                type: DataTypes.UUID,
                field: "created_by"
            },
            updatedBy: {
                type: DataTypes.UUID,
                field: "updated_by"
            },
            inputType: {
                type: DataTypes.STRING,
                field: "input_type"
            },
            createdAt: {
                type: DataTypes.DATE,
                field: "created_at",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: "updated_at",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            associate: (models) => {
                defaultAttributes.hasMany(models[config.FORM_ATTRIBUTES], { foreignKey: "default_attribute_id" });
            }
        }
    );

    return defaultAttributes;
};
