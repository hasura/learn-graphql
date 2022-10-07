package com.example.demo.event;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;
import java.util.Optional;

record Data<New, Old>(@JsonProperty("new") New _new, Old old) {}

record DeliveryInfo(Integer current_retry, Integer max_retries) {}

record Event<New, Old>(Data<New, Old> data, String op, Map<String, String> session_variables, TraceContext trace_context) {}

record Table(String name, String schema) {}

record TraceContext(String span_id, String trace_id) {}

record Trigger(String name) {}

public record EventPayload<New, Old>(String created_at, DeliveryInfo delivery_info, Event<New, Old> event, String id, Table table, Trigger trigger) {}
