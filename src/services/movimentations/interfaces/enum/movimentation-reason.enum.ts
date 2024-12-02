export enum EMovimentationReason {
  Insertion = "INSERTION",
  Edit = "EDIT",
  ReturnFromLoan = "RETURN_FROM_LOAN",
  ReturnFromMaintenance = "RETURN_FROM_MAINTENANCE",

  // Exit reasons
  Disposal = "DISPOSAL",
  Loan = "LOAN",
  SentToMaintenance = "SENT_TO_MAINTENANCE",
  Removed = "REMOVED",

  // Other reason
  Other = "OTHER",
}
