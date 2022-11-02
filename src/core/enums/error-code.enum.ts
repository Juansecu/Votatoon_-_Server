export enum EErrorCode {
  /* ------ GENERAL ERRORS ------ */
  INTERNAL_SERVER_ERROR = 'InternalServerError',
  UNAVAILABLE_SERVICE = 'UnavailableService',

  /* ------ CLIENT ERRORS ------ */
  CLIENT_NOT_FOUND = 'ClientNotFound',
  CLIENT_NOT_PROCESSED = 'ClientNotProcessed',

  /* ------ RACE ERRORS ------ */
  NO_ACTIVE_RACE = 'NoActiveRace',
  NO_RECORDS_AMOUNT_ENOUGH = 'NoRecordsAmountEnough',

  /* ------ VOTE ERRORS ------ */
  EXISTING_VOTE = 'ExistingVote'
}
