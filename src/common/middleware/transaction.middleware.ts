import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TransactionStorageService } from "../persistence/transaction-storage.service";
@Injectable()
export class TransactionMiddleware {
  constructor(private dataSource: DataSource, private txStorage: TransactionStorageService) {}
  async use(req: any, res: any, next: () => void) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    await this.txStorage.storage.run(queryRunner.manager, async () => {
      try { await next(); await queryRunner.commitTransaction(); }
      catch (err) { await queryRunner.rollbackTransaction(); throw err; }
      finally { await queryRunner.release(); }
    });
  }
}
