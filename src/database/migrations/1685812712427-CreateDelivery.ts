import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDelivery1685812712427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "delivery",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "tax",
                            type: "varchar",
                            isNullable: true,
                        },
                        {
                            name: "has_discount",
                            type: "boolean",
                            isNullable: true,
                        },
                        {
                            name: "condition",
                            type: "varchar",
                            isNullable: true,
                        },
                        {
                            name: "parameter",
                            type: "varchar",
                            isNullable: true,
                        },
                        {
                            name: "discount_percentage",
                            type: "varchar",
                            isNullable: true,
                        },
                        {
                            name: "user_id",
                            type: "varchar",
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
        await queryRunner.dropTable("delivery")

    }



}

