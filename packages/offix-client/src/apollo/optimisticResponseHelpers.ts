import { ApolloOfflineClient } from "./ApolloOfflineClient";
import { QueueEntryOperation } from "offix-offline";
import { MutationOptions } from "apollo-client";

export function addOptimisticResponse(apolloClient: ApolloOfflineClient, { op, qid }: QueueEntryOperation<MutationOptions>) {
  apolloClient.store.markMutationInit({
    mutationId: qid,
    document: op.mutation,
    variables: op.variables,
    updateQueries: {},
    update: op.update,
    optimisticResponse: op.optimisticResponse
  });
  apolloClient.queryManager.broadcastQueries();
}

export function removeOptimisticResponse(apolloClient: ApolloOfflineClient, { op, qid }: QueueEntryOperation<MutationOptions>) {
  apolloClient.store.markMutationComplete({
    mutationId: qid,
    optimisticResponse: op.optimisticResponse
  });
  apolloClient.queryManager.broadcastQueries();
}