package com.example.demo.action;

import java.util.Map;

record ActionName(String name) {
}

public record ActionPayload<T extends Record>(ActionName action, T input, String request_query,
                                              Map<String, String> session_variables) {
}
