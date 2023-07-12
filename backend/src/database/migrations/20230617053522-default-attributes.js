"use strict";

const { DEFAULT_ATTRIBUTES } = require("../../config/database-schema");

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(DEFAULT_ATTRIBUTES, {
            id: {
                type: Sequelize.UUID,
                field: "id",
                primaryKey: true,
                unique: true,
                defaultValue: Sequelize.UUIDV4
            },
            integrationId: {
                type: Sequelize.STRING,
                field: "integration_id"
            },
            name: {
                type: Sequelize.STRING,
                field: "name",
                allowNull: false
            },
            rank: {
                type: Sequelize.STRING,
                field: "rank"
            },
            type: {
                type: Sequelize.STRING,
                field: "type"
            },
            validation: {
                type: Sequelize.STRING,
                field: "validation"
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
        return queryInterface.dropTable(DEFAULT_ATTRIBUTES);
    }
};
