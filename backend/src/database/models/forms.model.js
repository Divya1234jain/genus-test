const config = require("../../config/database-schema");

module.exports = function (sequelize, DataTypes) {
    const forms = sequelize.define(
        config.FORMS,
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
            tableName: {
                type: DataTypes.STRING,
                field: "table_name"
            },
            mappingTable: {
                type: DataTypes.TEXT,
                field: "mapping_table"
            },
            name: {
                type: DataTypes.STRING,
                field: "name",
                allowNull: false
            },
            isPublished: {
                type: DataTypes.BOOLEAN,
                field: "is_published",
                defaultValue: false
            },
            sequence: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                field: "sequence"
            },
            projectId: {
                type: DataTypes.UUID,
                field: "project_id"
            },
            formTypeId: {
                type: DataTypes.UUID,
                field: "form_type_id"
            },
            remarks: {
                type: DataTypes.STRING,
                field: "remarks"
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
                forms.hasMany(models[config.FORM_ATTRIBUTES], { foreignKey: "form_id" });
                forms.hasMany(models[config.ATTRIBUTE_VALIDATION_BLOCKS], { foreignKey: "form_id" });
                forms.hasMany(models[config.ATTRIBUTE_VISIBILITY_BLOCKS], { foreignKey: "form_id" });
            }
        }
    );

    return forms;
};
