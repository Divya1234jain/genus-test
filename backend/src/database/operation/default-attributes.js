const { DEFAULT_ATTRIBUTES } = require("../../config/database-schema");
const { Base } = require("./base");

/**
 * Represents a database tables object with various properties and functionalities.
 *
 * This class provides the methods for database create, update, delete, get count and others for defaultAttributes table
 *
 * created by               version                         date
 * Tarun                   1.0.0                           17 June 2023
 *
 * @class DefaultAttributes
 */
class DefaultAttributes extends Base {

    constructor(requestQuery) {
        super(requestQuery);
        this.modelName = DEFAULT_ATTRIBUTES;
        this.initialiseModel();
        this.fields = {
            id: "id",
            name: "name",
            rank: "rank",
            type: "type",
            validation: "validation",
            integrationId: "integration_id",
            isActive: "is_active",
            createdBy: "created_by",
            updatedBy: "updated_by",
            createdAt: "created_at",
            updatedAt: "updated_at"
        };
        this.fieldsList = Object.keys(this.fields);
    }
}

module.exports = DefaultAttributes;
