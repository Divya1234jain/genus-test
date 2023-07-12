"use strict";

const config = require("../../config/database-schema");

module.exports = {
    up: async function (queryInterface, Sequelize) {
        await queryInterface.createTable(
            config.ATTRIBUTE_VISIBILITY_CONDITIONS,
            {
                id: {
                    type: Sequelize.UUID,
                    field: "id",
                    primaryKey: true,
                    unique: true,
                    defaultValue: Sequelize.UUIDV4
                },
                visibilityBlockId: {
                    type: Sequelize.UUID,
                    field: "visibility_block_id",
                    reference: {
                        model: config.ATTRIBUTE_VISIBILITY_CONDITIONS,
                        key: "id"
                    }
                },
                fromAttributeId: {
                    type: Sequelize.UUID,
                    field: "form_attribute_id",
                    reference: {
                        model: config.FORM_ATTRIBUTES,
                        key: "id"
                    }
                },
                operatorKey: {
                    type: Sequelize.TEXT,
                    field: "operator_key"
                },
                compareWithValue: {
                    type: Sequelize.TEXT,
                    field: "compare_with_value"
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
        await queryInterface.dropTable(config.ATTRIBUTE_VISIBILITY_CONDITIONS);
    }
};
