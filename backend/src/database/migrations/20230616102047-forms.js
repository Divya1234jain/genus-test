"use strict";

const { FORMS } = require("../../config/database-schema");

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(FORMS, {
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
            tableName: {
                type: Sequelize.STRING,
                field: "table_name"
            },
            mappingTable: {
                type: Sequelize.TEXT,
                field: "mapping_table"
            },
            name: {
                type: Sequelize.STRING,
                field: "name",
                allowNull: false
            },
            isPublished: {
                type: Sequelize.BOOLEAN,
                field: "is_published",
                defaultValue: false
            },
            sequence: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                field: "sequence"
            },
            // projectId: {
            //     type: Sequelize.UUID,
            //     field: "project_id",
            //     references: {
            //         model: PROJECTS,
            //         key: "id"
            //     }
            // },
            // formTypeId: {
            //     type: Sequelize.UUID,
            //     field: "form_type_id",
            //     references: {
            //         model: MASTER_MAKER_LOVS,
            //         key: "id"
            //     }
            // },
            isActive: {
                type: Sequelize.ENUM,
                field: "is_active",
                values: ["0", "1"],
                allowNull: false,
                defaultValue: "1"
            },
            remarks: {
                type: Sequelize.STRING,
                field: "remarks"
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
        return queryInterface.dropTable(FORMS);
    }
};
