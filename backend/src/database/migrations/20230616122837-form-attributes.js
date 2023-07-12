"use strict";

const config = require("../../config/database-schema");

module.exports = {
    up: async function (queryInterface, Sequelize) {
        await queryInterface.createTable(
            config.FORM_ATTRIBUTES,
            {
                id: {
                    type: Sequelize.UUID,
                    field: "id",
                    primaryKey: true,
                    unique: true,
                    defaultValue: Sequelize.UUIDV4
                },
                name: {
                    type: Sequelize.STRING,
                    field: "name"
                },
                columnName: {
                    type: Sequelize.STRING,
                    field: "column_name"
                },
                mappingColumn: {
                    type: Sequelize.TEXT,
                    field: "mapping_column"
                },
                rank: {
                    type: Sequelize.INTEGER,
                    field: "rank"
                },
                screenType: {
                    type: Sequelize.ENUM,
                    field: "screen_type",
                    values: ["0", "1", "2"],
                    defaultValue: "0"
                },
                properties: {
                    type: Sequelize.JSON,
                    field: "properties"
                },
                formId: {
                    type: Sequelize.UUID,
                    field: "form_id"
                },
                defaultAttributeId: {
                    type: Sequelize.UUID,
                    field: "default_attribute_id"
                },
                isRequired: {
                    type: Sequelize.STRING,
                    field: "is_required"
                },
                isUnique: {
                    type: Sequelize.STRING,
                    field: "is_unique"
                },
                isNull: {
                    type: Sequelize.STRING,
                    field: "is_null"
                },
                isActive: {
                    type: Sequelize.ENUM,
                    field: "is_active",
                    values: ["0", "1"],
                    allowNull: false,
                    defaultValue: "1"
                },
                createdBy: {
                    type: Sequelize.UUID,
                    field: "created_by"
                },
                updatedBy: {
                    type: Sequelize.UUID,
                    field: "updated_by"
                },
                createdAt: {
                    type: Sequelize.DATE,
                    field: "created_at",
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    field: "updated_at",
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    allowNull: false
                }
            }
        );

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(config.FORM_ATTRIBUTES);
    }
};
