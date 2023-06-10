import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddingProductsIdsToOrder1686434541244 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'orders',
            [
                new TableColumn({
                    name: 'products_ids',
                    type: 'text',
                    isArray: true,
                    isNullable: true,
                })

            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'products_ids');
    }

}
