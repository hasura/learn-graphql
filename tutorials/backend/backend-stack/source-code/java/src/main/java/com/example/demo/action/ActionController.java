package com.example.demo.action;

import com.example.packagename.client.ShowsGraphQLQuery;
import com.example.packagename.client.ShowsProjectionRoot;
import com.netflix.graphql.dgs.client.GraphQLResponse;
import com.netflix.graphql.dgs.client.MonoGraphQLClient;
import com.netflix.graphql.dgs.client.WebClientGraphQLClient;
import com.netflix.graphql.dgs.client.codegen.GraphQLQueryRequest;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
public class ActionController {
    @PostMapping("/action")
    public ResponseEntity<LoginResponse> login(RequestEntity<ActionPayload<loginArgs>> request) {
        GraphQLQueryRequest graphQLQueryRequest = new GraphQLQueryRequest(new ShowsGraphQLQuery.Builder().build(), new ShowsProjectionRoot().title());
        String query = graphQLQueryRequest.serialize();
        WebClient webClient = WebClient.create("http://localhost:8080/v1/graphql");
        WebClientGraphQLClient client = MonoGraphQLClient.createWithWebClient(webClient);
        Mono<GraphQLResponse> graphQLResponseMono = client.reactiveExecuteQuery(query);
        graphQLResponseMono.subscribe(result -> System.out.println(result.getJson()));

        return ResponseEntity.ok().body(new LoginResponse("<sample value>"));
    }
}
