const config = require("../../config/database-schema");

module.exports = function (sequelize, DataTypes) {
    const attributeVisibilityBlocks = sequelize.define(
        config.ATTRIBUTE_VISIBILITY_BLOCKS,
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
            type: {
                type: DataTypes.ENUM,
                field: "type",
                values: ["and", "or"],
                defaultValue: "and"
            },
            visibleColumns: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                field: "visible_columns",
                allowNull: false
            },
            isPublished: {
                type: DataTypes.BOOLEAN,
                field: "is_published"
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
                attributeVisibilityBlocks.hasMany(models[config.ATTRIBUTE_VISIBILITY_CONDITIONS], { foreignKey: "visibility_block_id" });
                attributeVisibilityBlocks.belongsTo(models[config.FORMS], { foreignKey: "form_id" });

            }
        }
    );

    return attributeVisibilityBlocks;
};
