"use strict";

const config = require("../../config/database-schema");

module.exports = {
    up: async function (queryInterface, Sequelize) {
        await queryInterface.createTable(
            config.ATTRIBUTE_VALIDATION_CONDITIONS,
            {
                id: {
                    type: Sequelize.UUID,
                    field: "id",
                    primaryKey: true,
                    unique: true,
                    defaultValue: Sequelize.UUIDV4
                },
                validationBlockId: {
                    type: Sequelize.UUID,
                    field: "validation_block_id",
                    reference: {
                        model: config.ATTRIBUTE_VALIDATION_BLOCKS,
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
                compareWithFormAttributeId: {
                    type: Sequelize.UUID,
                    field: "compare_with_form_attribute_id",
                    reference: {
                        model: config.FORM_ATTRIBUTES,
                        key: "id"
                    }
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
        await queryInterface.dropTable(config.ATTRIBUTE_VALIDATION_CONDITIONS);
    }
};
