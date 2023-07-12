const { MASTER_MAKER_LOVS, PROJECTS, FORMS } = require("../../config/database-schema");
const { Base } = require("./base");

/**
 * Represents a database tables object with various properties and functionalities.
 *
 * This class provides the methods for database create, update, delete, get count and others for forms table
 *
 * created by               version                         date
 * Tarun                   1.0.0                           16 June 2023
 *
 * @class Forms
 */
class Forms extends Base {

    constructor(requestQuery) {
        super(requestQuery);
        this.modelName = FORMS;
        this.initialiseModel();
        this.fields = {
            id: "id",
            name: "name",
            integrationId: "integration_id",
            tableName: "table_name",
            mappingTable: "mapping_table",
            isPublished: "is_published",
            sequence: "sequence",
            projectId: "project_id",
            formTypeId: "form_type_id",
            remarks: "remarks",
            isActive: "is_active",
            createdBy: "created_by",
            updatedBy: "updated_by",
            createdAt: "created_at",
            updatedAt: "updated_at"
        };
        this.fieldsList = Object.keys(this.fields);
        this.relations = [
            {
                model: this.db[PROJECTS],
                attributes: ["id", "name"]
            },
            {
                model: this.db[MASTER_MAKER_LOVS],
                attributes: ["id", "name"]
            }
        ];
    }
}

module.exports = Forms;
