const { FORM_ATTRIBUTES, FORMS, DEFAULT_ATTRIBUTES } = require("../../config/database-schema");
const { Base } = require("./base");

/**
 * Represents a database tables object with various properties and functionalities.
 *
 * This class provides the methods for database create, update, delete, get count and others for forms table
 *
 * created by               version                         date
 * Divya                    1.0.0                           17 June 2023
 *
 * @class FORM_ATTRIBUTES
 */
class FormsAttributes extends Base {

    constructor(requestQuery) {
        super(requestQuery);
        this.modelName = FORM_ATTRIBUTES;
        this.initialiseModel();
        this.fields = {
            id: "id",
            name: "name",
            columnName: "column_name",
            mappingColumn: "mapping_column",
            rank: "rank",
            screenType: "screen_type",
            formId: "form_id",
            defaultAttributeId: "default_attribute_id",
            properties: "properties",
            isRequired: "is_required",
            isUnique: "is_unique",
            isNull: "is_null",
            isActive: "is_active",
            createdBy: "created_by",
            updatedBy: "updated_by",
            createdAt: "created_at",
            updatedAt: "updated_at"
        };
        this.fieldsList = Object.keys(this.fields);
        this.relations = [
            {
                model: this.db[FORMS],
                attributes: ["id", "name"]
            },
            {
                model: this.db[DEFAULT_ATTRIBUTES],
                attributes: ["id", "name", "inputType"]
            }
        ];
    }
}

module.exports = FormsAttributes;
