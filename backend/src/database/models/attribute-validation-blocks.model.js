const config = require("../../config/database-schema");

module.exports = function (sequelize, DataTypes) {
    const attributeValidationBlocks = sequelize.define(
        config.ATTRIBUTE_VALIDATION_BLOCKS,
        {
            id: {
                type: DataTypes.UUID,
                field: "id",
                primaryKey: true,
                unique: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                field: "name",
                allowNull: false
            },
            formId: {
                type: DataTypes.UUID,
                field: "form_id"
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM,
                field: "type",
                values: ["and", "or"],
                defaultValue: "and"
            },
            isActive: {
                type: DataTypes.ENUM,
                field: "is_active",
                values: ["0", "1"],
                allowNull: false,
                defaultValue: "1"
            },
            isPublished: {
                type: DataTypes.BOOLEAN,
                field: "is_published"
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
                attributeValidationBlocks.hasMany(models[config.ATTRIBUTE_VALIDATION_CONDITIONS], { foreignKey: "validation_block_id" });
                attributeValidationBlocks.belongsTo(models[config.FORMS], { foreignKey: "form_id" });

            }
        }
    );

    return attributeValidationBlocks;
};
