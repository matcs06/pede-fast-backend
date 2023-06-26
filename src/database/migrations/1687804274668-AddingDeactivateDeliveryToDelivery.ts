import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AddingDeactivateDeliveryToDelivery1687804274668 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns(
            'orders',
            [
                new TableColumn({
                    name: 'deativate_delivery',
                    type: 'boolean',
                    isNullable: true,
                })

            ]
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('delivery', 'deactivate_delivery');
    }

}
