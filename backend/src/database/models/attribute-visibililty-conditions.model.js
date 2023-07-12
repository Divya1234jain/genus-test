const config = require("../../config/database-schema");

module.exports = function (sequelize, DataTypes) {
    const attributeVisibilityConditions = sequelize.define(
        config.ATTRIBUTE_VISIBILITY_CONDITIONS,
        {
            id: {
                type: DataTypes.UUID,
                field: "id",
                primaryKey: true,
                unique: true,
                defaultValue: DataTypes.UUIDV4
            },
            visibilityBlockId: {
                type: DataTypes.UUID,
                field: "visibility_block_id"
            },
            fromAttributeId: {
                type: DataTypes.UUID,
                field: "form_attribute_id"
            },
            operatorKey: {
                type: DataTypes.TEXT,
                field: "operator_key"
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
                attributeVisibilityConditions.belongsTo(models[config.ATTRIBUTE_VISIBILITY_BLOCKS], { foreignKey: "visibility_block_id" });
                attributeVisibilityConditions.belongsTo(models[config.FORM_ATTRIBUTES], { foreignKey: "form_attribute_id" });
            }
        }
    );

    return attributeVisibilityConditions;
};
