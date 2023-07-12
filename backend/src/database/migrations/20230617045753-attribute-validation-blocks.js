"use strict";

const { ATTRIBUTE_VALIDATION_BLOCKS, FORMS } = require("../../config/database-schema");

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(ATTRIBUTE_VALIDATION_BLOCKS, {
            id: {
                type: Sequelize.UUID,
                field: "id",
                primaryKey: true,
                unique: true,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING,
                field: "name",
                allowNull: false
            },
            formId: {
                type: Sequelize.UUID,
                field: "form_id",
                references: {
                    model: FORMS,
                    key: "id"
                }
            },
            type: {
                type: Sequelize.ENUM,
                field: "type",
                values: ["and", "or"],
                allowNull: false,
                defaultValue: "and"
            },
            message: {
                type: Sequelize.TEXT,
                field: "message",
                allowNull: false
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
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable(ATTRIBUTE_VALIDATION_BLOCKS);
    }
};
