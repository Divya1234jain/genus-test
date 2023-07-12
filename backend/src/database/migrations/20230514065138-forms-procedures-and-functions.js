"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Create the procedure
        await queryInterface.sequelize.query(`
        -- ========================================== Procedure to create dynamic table =========================================
        CREATE OR REPLACE PROCEDURE create_dynamic_table(
            IN p_schema_name text,
            IN p_table_name text,
            IN p_columns text
        )
        LANGUAGE plpgsql
        AS $$
        BEGIN
            EXECUTE 'CREATE TABLE ' || p_schema_name || '.' || p_table_name || ' (' || p_columns || ')';
            CALL create_history_table(p_schema_name, p_table_name);
        END;
        $$;

        -- ============================== Procedure to insert new records in form submissions table ==============================
        CREATE OR REPLACE PROCEDURE save_form_submissions (
            p_schema_name text,
            p_table_name text,
            p_columns text,
            p_values text
        )
        LANGUAGE plpgsql
        AS $$
        DECLARE
            query_text text;
        BEGIN
            query_text := FORMAT($q$
                INSERT INTO %s.%s (%s) values (%s);
            $q$, p_schema_name, p_table_name, p_columns, p_values);
            EXECUTE query_text;
        END;
        $$;

        -- ============================== Procedure to insert new records in form submissions table ==============================
        CREATE OR REPLACE PROCEDURE update_form_submissions (
            p_schema_name text,
            p_table_name text,
            update_columns_text text,
            record_id uuid
        )
        LANGUAGE plpgsql
        AS $$
        DECLARE
            query_text text;
            count_number integer;
        BEGIN
            -- check if record exists or not
            query_text := FORMAT($q$ 
                SELECT COUNT(*) FROM %s.%s where id='%s';
            $q$, p_schema_name, p_table_name, record_id);
            EXECUTE query_text INTO count_number;
            IF count_number = 0 THEN
                RAISE EXCEPTION 'Record not found';
            END IF;

            -- update the record
            query_text := FORMAT($q$
                UPDATE %s.%s SET %s WHERE id='%s';
            $q$, p_schema_name, p_table_name, update_columns_text, record_id);
            EXECUTE query_text;
        END;
        $$;


        -- ============================== Function to get the dynamic table data ==============================
        CREATE OR REPLACE FUNCTION public.gen_query(
            p_table_schema text,
            p_table_name text,
            p_where_conditions text[],
            pagination_params text)
            RETURNS text
            LANGUAGE 'plpgsql'
            COST 100
            VOLATILE PARALLEL UNSAFE
        AS $BODY$
            DECLARE
                ref_records refcursor;
                record_text record;
                query_text text;
                join_query text := '';
                select_column_query text;
                select_query_result text;
                relations_alias text;
                where_condition_query text := '';
            BEGIN
                select_column_query := (
                    SELECT string_agg('"' || quote_ident(p_table_name) || '"."' || quote_ident(column_name) || '"', ', ')
                    FROM information_schema.columns
                    WHERE table_name = p_table_name AND table_schema = p_table_schema
                );
        
                query_text := FORMAT($q$
                    SELECT 
                        TC.CONSTRAINT_NAME, 
                        TC.CONSTRAINT_TYPE, 
                        TC.TABLE_NAME, 
                        TC.TABLE_SCHEMA,
                        KCU.COLUMN_NAME
                    FROM 
                        INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS TC
                    JOIN 
                        INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS KCU 
                        ON 
                        TC.CONSTRAINT_NAME = KCU.CONSTRAINT_NAME
                    WHERE 
                        KCU.TABLE_NAME = '%s' AND TC.CONSTRAINT_TYPE = 'FOREIGN KEY'
                $q$, p_table_name);
        
                OPEN ref_records FOR EXECUTE query_text;
                FETCH NEXT FROM ref_records INTO record_text;
        
                WHILE FOUND LOOP
                    relations_alias := replace(record_text.constraint_name, '_id_fkey', '');
        
                    EXECUTE FORMAT($a$ 
                        SELECT STRING_AGG('"%s"."' || column_name || '" AS "%s.' || column_name || '"', ', ') 
                        FROM information_schema.columns 
                        WHERE table_name = '%s'
                    $a$, relations_alias, relations_alias, record_text.table_name) INTO select_query_result;
        
                    select_column_query := select_column_query || ',' || select_query_result;
        
                    join_query := FORMAT($Q$ %s LEFT OUTER JOIN %I.%I AS %s ON %s.%I = %s.%I %s $Q$,
                        join_query, record_text.table_schema, record_text.table_name, relations_alias, relations_alias, record_text.column_name,
                        p_table_name, record_text.column_name, ' '
                    );
        
                    FETCH NEXT FROM ref_records INTO record_text;
                END LOOP;
        
                IF array_length(p_where_conditions, 1) IS NOT NULL THEN
                    FOR i IN 1..array_length(p_where_conditions, 1) / 2 LOOP
                        where_condition_query := where_condition_query || format('%s = %L',
                            p_where_conditions[i * 2 - 1], p_where_conditions[i * 2]);
                    END LOOP;
                END IF;
        
                RETURN format($a$ SELECT %s FROM %s %s WHERE %s %s $a$, select_column_query, p_table_name, join_query, where_condition_query, pagination_params);
            END;
        $BODY$;

      `);
    },

    down: async (queryInterface, Sequelize) => {
        // Drop the procedure and functions
        await queryInterface.sequelize.query(`
            DROP PROCEDURE IF EXISTS create_dynamic_table;
            DROP PROCEDURE IF EXISTS save_form_submissions;
            DROP PROCEDURE IF EXISTS update_form_submissions;
            DROP FUNCTION IF EXISTS gen_query;
        `);
    }
};
