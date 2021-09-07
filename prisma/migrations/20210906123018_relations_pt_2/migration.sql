-- AddForeignKey
ALTER TABLE "Orders" ADD FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("code") ON DELETE CASCADE ON UPDATE CASCADE;
