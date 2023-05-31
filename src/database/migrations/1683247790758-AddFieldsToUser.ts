import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddFieldsToUser1683247790758 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'users',
            [
                new TableColumn({
                    name: 'business_name',
                    type: 'varchar',
                    isNullable: true
                }),
                new TableColumn({
                    name: 'address',
                    type: 'varchar',
                    isNullable: true
                }),
                new TableColumn({
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true
                }),
                new TableColumn({
                    name: 'user_level',
                    type: 'varchar',
                    isNullable: true
                }),
                new TableColumn({
                    name: 'payment_status',
                    type: 'varchar',
                    isNullable: true
                }),

            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'payment_status');
        await queryRunner.dropColumn('users', 'user_level');
        await queryRunner.dropColumn('users', 'phone');
        await queryRunner.dropColumn('users', 'address');
        await queryRunner.dropColumn('users', 'business_name');
    }

}
