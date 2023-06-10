import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class OrderCreate1686433003600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "orders",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "customer_name",
                            type: "varchar",
                            isNullable: true,
                        },
                        {
                            name: "customer_address",
                            type: "varchar",
                            isNullable: true,
                        },
                        {
                            name: "customer_phone",
                            type: "varchar",
                            isNullable: true,
                        },
                        {
                            name: "adm_user_id",
                            type: "varchar",
                            isNullable: true,
                        },
                        {
                            name: "product",
                            type: "varchar",
                            isNullable: true,
                        },
                        {
                            name: "status",
                            type: "varchar",
                            isNullable: true,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders")
    }

}
