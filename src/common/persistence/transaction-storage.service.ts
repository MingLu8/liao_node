import { Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";
import { EntityManager } from "typeorm";
@Injectable()
export class TransactionStorageService {
  private readonly als = new AsyncLocalStorage<EntityManager>();
  get storage() { return this.als; }
  getEntityManager() { return this.als.getStore(); }
}
