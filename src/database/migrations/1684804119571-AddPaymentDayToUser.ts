import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPaymentDayToUser1684804119571 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'users',
            [
                new TableColumn({
                    name: 'payment_day',
                    type: 'varchar',
                    isNullable: true
                })

            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'payment_day');
    }

}
