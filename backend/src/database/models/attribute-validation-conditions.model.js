const config = require("../../config/database-schema");

module.exports = function (sequelize, DataTypes) {
    const attributeValidationConditions = sequelize.define(
        config.ATTRIBUTE_VALIDATION_CONDITIONS,
        {
            id: {
                type: DataTypes.UUID,
                field: "id",
                primaryKey: true,
                unique: true,
                defaultValue: DataTypes.UUIDV4
            },
            validationBlockId: {
                type: DataTypes.UUID,
                field: "validation_block_id"
            },
            fromAttributeId: {
                type: DataTypes.UUID,
                field: "form_attribute_id"
            },
            operatorKey: {
                type: DataTypes.TEXT,
                field: "operator_key",
                allowNull: false
            },
            compareWithFormAttributeId: {
                type: DataTypes.UUID,
                field: "compare_with_form_attribute_id"
            },
            compareWithValue: {
                type: DataTypes.TEXT,
                field: "compare_with_value"
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
                attributeValidationConditions.belongsTo(models[config.ATTRIBUTE_VALIDATION_BLOCKS], { foreignKey: "validation_block_id" });
                attributeValidationConditions.belongsTo(models[config.FORM_ATTRIBUTES], { foreignKey: "form_attribute_id" });
                attributeValidationConditions.belongsTo(models[config.FORM_ATTRIBUTES], { foreignKey: "compare_with_form_attribute_id", as: "compare_with_form_value" });
            }
        }
    );

    return attributeValidationConditions;
};
