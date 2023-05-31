import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProducts1683247628459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "products",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "user_id",
                            type: "uuid",
                        },
                        {
                            name: "name",
                            type: "varchar",
                        },
                        {
                            name: "description",
                            type: "varchar",
                            isNullable: true
                        },
                        {
                            name: "price",
                            type: "varchar",
                            isNullable: true
                        },
                        {
                            name: "enabled",
                            type: "boolean",
                            isNullable: true
                        },
                        {
                            name: "image_url",
                            type: "varchar",
                            isNullable: true
                        },
                        {
                            name: "quantity",
                            type: "varchar",
                            isNullable: true
                        },
                        {
                            name: "options",
                            type: "text",
                            isArray: true,
                            default: "'{}'",
                            isNullable: true
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        },

                    ]
                }

            )
        )

        await queryRunner.createForeignKey(
            "products",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("products", "products_users_user_id_foreign");
        await queryRunner.dropTable("products");
    }

}
