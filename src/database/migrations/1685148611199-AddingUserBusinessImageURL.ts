import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddingUserBusinessImageURL1685148611199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns(
            'users',
            [
                new TableColumn({
                    name: 'business_image_url',
                    type: 'varchar',
                    isNullable: true
                })

            ]
        );
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'business_image_url');
    }

}
