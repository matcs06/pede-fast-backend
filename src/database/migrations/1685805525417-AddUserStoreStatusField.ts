import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserStoreStatusField1685805525417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'users',
            [
                new TableColumn({
                    name: 'store_status',
                    type: 'varchar',
                    isNullable: true
                })

            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'store_status');
    }
}
