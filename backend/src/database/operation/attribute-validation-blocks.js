const { ATTRIBUTE_VALIDATION_BLOCKS } = require("../../config/database-schema");
const { Base } = require("./base");

/**
 * Represents a database tables object with various properties and functionalities.
 * 
 * This class provides the methods for database create, update, delete, get count and others for attribute validation block table
 * 
 * created by               version                         date
 * Mohammed Sameer           1.0.0                       17 June 2023
 * 
 * @class AttributeValidationBlocks
 */
class AttributeValidationBlocks extends Base {
    
    constructor(requestQuery) {
        super(requestQuery);
        this.modelName = ATTRIBUTE_VALIDATION_BLOCKS;
        this.initialiseModel();
        this.fields = {
            id: "id",
            name: "name",
            formId: "form_id",
            type: "type",
            message: "message",
            isPublished: "is_published",
            isActive: "is_active",
            createdBy: "created_by",
            updatedBy: "updated_by",
            createdAt: "created_at",
            updatedAt: "updated_at"
        };
        this.fieldsList = Object.keys(this.fields);
    }
}

module.exports = AttributeValidationBlocks;