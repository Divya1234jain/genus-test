const { ATTRIBUTE_VISIBILITY_CONDITIONS, ATTRIBUTE_VISIBILITY_BLOCKS, FORM_ATTRIBUTES } = require("../../config/database-schema");
const { Base } = require("./base");

/**
 * Represents a database tables object with various properties and functionalities.
 * 
 * This class provides the methods for database create, update, delete, get count and others for attribute visibility condition table
 * 
 * created by               version                         date
 * Mohammed Sameer          1.0.0                        18 June 2023
 * 
 * @class AttributeVisibilityConditions
 */
class AttributeVisibilityConditions extends Base {
    
    constructor(requestQuery) {
        super(requestQuery);
        this.modelName = ATTRIBUTE_VISIBILITY_CONDITIONS;
        this.initialiseModel();
        this.fields = {
            id: "id",
            visibilityBlockId: "validation_block_id",
            fromAttributeId: "form_attribute_id",
            operatorKey: "operator_key",
            compareWithValue: "compare_with_value",
            isActive: "is_active",
            createdBy: "created_by",
            updatedBy: "updated_by",
            createdAt: "created_at",
            updatedAt: "updated_at"
        };
        this.fieldsList = Object.keys(this.fields);
        this.relations = [
            {
                model: this.db[ATTRIBUTE_VISIBILITY_BLOCKS],
                attributes: ["id", "name", "type", "visible_columns", "is_active"]
            },
            {
                model: this.db[FORM_ATTRIBUTES],
                attributes: ["id", "name"]
            }
        ];
    }
}

module.exports = AttributeVisibilityConditions;