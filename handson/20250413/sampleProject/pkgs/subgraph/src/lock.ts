import { Withdrawal as WithdrawalEvent } from "../generated/Lock/Lock"
import { Withdrawal } from "../generated/schema"

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount
  entity.when = event.params.when

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
